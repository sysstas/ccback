((configRepo) => {
  configRepo.SetConfig = (paypal) => {
    const config = {
      host: 'api.sandbox.paypal.com',
      port: '',
      client_id: 'AYX-oFJ7-9A2WO4MsT2b2PNfgqvzk3ZHMoIN5HzmcIcBF7Y6dBpn3N1PosyElkwdel8lWi3fGTHEwz6v',
      client_secret: 'EHb0PZrIqF2XQLOCBhEs-rxjS2OX8dJqZRNhjCkzPnMEByJL3VV5xIotBdeimtoRyPPZPoOikxl7Ejzp'
    }
    paypal.configure(config)
  }
})(module.exports)
