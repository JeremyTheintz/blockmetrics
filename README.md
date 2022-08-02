# Block metrics

The best place to get data about blockchain and a tool to compare them according to several parameters such as reliability, energy consumption, number of tokens and much more.

The main objective is to offer to everyone an easy way to understand what a blockchain is, what the implications of its use are and to be able to make a conscious choice before using one blockcahin than another.

## TODO

### Global :white_check_mark:

-   [x] Buy block-metrics domain name
-   [x] Buy blockmetrics.eth
-   [ ] Complete readme for each service
-   [ ] Update this readme with link to others
-   [ ] Add Cypress E2E tests
-   [x] remove "note" from blockchain table, remove note column fetching from APIs
-   [ ] Create text content

-   [ ] Create an image with a schudeled task to restart the server each 6 hours to prevent High Memory usage (remove when memory leak will be found)

- [ ] setup linters
- [ ] setup github actions to run tests before merge to production

### Server

-   [ ] Fetch and put in blockchain table the testnet node count for PoS blockchains
-   [ ] prevent bitcoin webscoket from disconnecting

### API - REST

-   [ ] separate endpoints in multiple files
-   [ ] Deploy doc swagger at doc.api-rest.block-metrics.io

### API - WS

-   [ ] Create doc swagger 

### Frontend

-   [ ] BMSquaredIcon component
-   [ ] Chart tooltip
-   [ ] Switch component
-   [ ] Unselect all button
-   [ ] Integrate Comparison page
-   [x] Add help tooltip where it's necessary
-   [ ] Add skeleton and alert pop when api not available


### Integrated Blockchains

-   [x] Ethereum
-   [x] Binance Smart Chain
-   [x] Polygon
-   [x] Avalanche
-   [x] Bitcoin
-   [x] Fantom
-   [ ] Solana
-   [ ] Celo
-   [ ] Harmony
-   [ ] Gnosis
-   [ ] Moonbeam :pushpin: (https://moonscan.io/charts)
-   [ ] Arbitrum :pushpin: (https://arbiscan.io/charts)
-   [ ] Optimism :pushpin: (https://optimistic.etherscan.io/charts)
-   [ ] Nervos :pushpin: (https://explorer.nervos.org/charts)
-   [ ] Near :pushpin: :triangular_flag_on_post: (https://nearblocks.io/charts/txns)

#### Webhook to deploy an updated image from dockerhub to jelastic cloud

`https://app.jpc.infomaniak.com/1.0/environment/control/rest/redeploycontainerbyid?envName=block-metrics&session=[ACCESS_TOKEN]&tag=latest&nodeId=[NODE_ID]&useExistingVolumes=true`
