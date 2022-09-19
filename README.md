## Black History DAO Demo Front End

Pre-requisites

```
A Local Running Node https://github.com/BlackHistoryDAO/barnacle
polkadot.js.org browser extension to initialize the DAO
```

Frontend on Netlify (requires a local running node. See above) : https://fancy-cajeta-60dafd.netlify.app/

Demo Video : https://drive.google.com/file/d/1OP7KPwDUVbVeiubbsrKTe7lybYQQOJTO/view?usp=sharing

Demo Slides : https://docs.google.com/presentation/d/1lYQ-5LnGVzMvtW5HTDDqjH2BQDyU9SsaGWmi4kH2t_4/edit?usp=sharing

### Local Build

```
yarn install
yarn start
```

### DAO Initialization

The DAO currently uses non-transferable NFTs to manage membership which can be initialized to default values by calling
init_collections() in the bhdao pallet. You can add collectors, contributors and qualifiers by calling add_collectors(address),
add_contributor(address) and add_qualifier(address) respectively. Similarly, voting values can be changed by calling set_qualification_voting_window(u32)
and set_verification_voting_window(u32). All of these are SUDO functions that will be phased out in the stage 2 of the development of 
Black History DAO.

