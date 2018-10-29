/**
 The MIT License (MIT)
 Copyright (c) 2017 Fredrik Westmark
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 **/

/**
 Based on https://auth0.com/blog/navigating-rs256-and-jwks/
 **/

const request = require('request')
const jwt = require('jsonwebtoken')

function certToPEM (cert) {
  let pem = cert.match(/.{1,64}/g).join('\n')
  pem = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`
  return pem
}

let jwks = null

function fetchJWKS (tenant) {
  if (jwks) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    request(
      {
        uri: `https://${tenant}/.well-known/jwks.json`,
        strictSsl: true,
        json: true
      },
      (err, res) => {
        if (err) {
          reject(err)
        } else if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(res.body && (res.body.message || res.body)))
        } else {
          jwks = res.body.keys
          resolve()
        }
      }
    )
  })
}

function getJWKS () {
  return jwks
}

function getJWKSSigningKeys () {
  return jwks
    .filter(
      (key) =>
        key.use === 'sig' && // JWK property `use` determines the JWK is for signing
        key.kty === 'RSA' && // We are only supporting RSA (RS256)
        key.kid && // The `kid` must be present to be useful for later
        ((key.x5c && key.x5c.length) || (key.n && key.e)) // Has useful public keys
    )
    .map((key) => ({ kid: key.kid, nbf: key.nbf, publicKey: certToPEM(key.x5c[ 0 ]) }))
}

function getJWKSSigningKey (kid) {
  return getJWKSSigningKeys().find((key) => key.kid === kid)
}

async function verifyJWTToken (tokenreq) {
  const tenant = 'clockwiseclockwork.eu.auth0.com'
  await fetchJWKS(tenant)
  const token = tokenreq
  const decodedToken = jwt.decode(token, { complete: true })
  const { header } = decodedToken

  if (!header || header.alg !== 'RS256') {
    throw new Error('Token is not RS256 encoded')
  }

  const key = getJWKSSigningKey(header.kid)
  const actualKey = key.publicKey || key.rsaPublicKey

  return new Promise((resolve, reject) => {
    jwt.verify(token, actualKey, { algorithms: [ 'RS256' ] }, (err, decoded) => {
      if (err) {
        reject(new Error('invalid_token', err))
      } else {
        resolve(decoded)
      }
    })
  })
}

module.exports = verifyJWTToken
