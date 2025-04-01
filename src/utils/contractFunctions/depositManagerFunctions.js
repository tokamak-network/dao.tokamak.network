export const depositManagerFunctionsOfTypeA = [
  {
    'params': {
      'aboutParam0': 'uint256 globalWithdrawalDelay_: Minimum withdrawal period (unit: block)',
      'exampleParam0': '1000',
    },
    'name': 'setGlobalWithdrawalDelay',
    'title': '(Deposit Manager)Global withdrawal delay will be changed.',
    'prettyName': '',
    'disabled': false,
    'explanation':
`Tokamak Network Layer 2 staking has a global withdrawal delay.

Staking operators can set individual withdrawal delay, but there is a minimum withdrawal delay period set throughout the network. This minimum withdrawal delay period is the 'global withdrawal delay', and each operator's withdrawal delay cannot be lower than the global withdrawal delay.

This withdrawal delay is specified in blocks. New global withdrawal delay will be applied when an offer is passed with the number of blocks you want to propose via 'globalWithdrawalDelay_'`,
  },
];

export const depositManagerFunctionsOfTypeB = [
  {
    'params': {
      'aboutParam0': 'address newOwner: Address to receive owner authority',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'transferOwnership',
    'title': '(Deposit Manager)DAO\'s owner rights for WTON will be transferred.',
    'prettyName': '',
    'disabled': false,
    'explanation':
'DAO has owner rights for Depositmanager (user deposit and withdrawal process management during staking). This function allows you to change the authority, and you can enter the address to which the authority will be transferred in the first parameter (Param1). It will be used when the DAO is updated.',
  },
  {
    'params': {
      'aboutParam0': 'address seigManager: New seig manager contract address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'setSeigManager',
    'title': '(Deposit Manager)Seigniorage Manage Contract of Depositmanager will be changed.',
    'prettyName': '',
    'disabled': false,
    'explanation':
`Deposit Manager (user deposit and withdrawal process management during staking) holds a contract to manage seigniorage.
This function allows you to change the contract, and you can enter the contract address to be changed in the first parameter (Parma1). It will be used when the seigniorage management contract is updated.`,
  },
  {
    'params': {
      'aboutParam0': 'address _l1BridgeRegistry: The L2BridgeRegistry address',
      'exampleParam0': '0x0000000000000000000000000000000000000001',
      'aboutParam1': 'address _layer2Manager: The Layer2Mnager address',
      'exampleParam1': '0x0000000000000000000000000000000000000002',
    },
    'name': 'setAddresses',
    'title': '(Deposit Manager)Set l1BridgeRegistry and layer2Manager addresses.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'l1BridgeRegistry and layer2Manager addresses are updated.',
  },
  {
    'params': {
      'aboutParam0': 'address newImplementation: Additional Deposit Manager logic contract address to use',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
      'aboutParam1': 'uint256 _index: Index address to use',
      'exampleParam1': '0',
      'aboutParam2': 'bool _alive: Whether to use that logic or not',
      'exampleParam2': 'true',
    },
    'name': 'setImplementation2',
    'title': '(Deposit Manager) Add logic to use the Deposit Manager contract. ',
    'prettyName': '',
    'disabled': false,
    'explanation':
'Set the address and index number of the additional logic to be used in the Deposit Manager contract, and whether or not to use it.',
  },
  {
    'params': {
      'aboutParam0': 'bytes4[] _selectors: Selector for functions to be used in additional logic contracts',
      'exampleParam0': '[0x00000000]',
      'aboutParam1': 'address _imp: Additional logic contract address',
      'exampleParam1': '0x0000000000000000000000000000000000000000',
    },
    'name': 'setSelectorImplementations2',
    'title': '(Deposit Manager) Setting up functions to be used in additional logic. ',
    'prettyName': '',
    'disabled': false,
    'explanation':
'Setting up functions to be used in additional logic.',
  },
//   {
//     'params': {
//       'aboutParam0': 'address layer2: Layer2 address',
//       'exampleParam0': '0x0000000000000000000000000000000000000000',
//       'aboutParam1': 'address recipient: The recipient\'s address',
//       'exampleParam1': '0x0000000000000000000000000000000000000000',
//       'aboutParam2': 'uint256 amount: Amount to slash',
//       'exampleParam2': '0x0000000000000000000000000000000000000000',
//     },
//     'name': 'slash',
//     'title': '',
//     'prettyName': '',
// 'disabled': false,
//     'explanation':
// 'This function allows you to change the operator of Layer 2. Since the operator can be forcibly changed, it can be used in the event of malicious act.',
//   },
];
