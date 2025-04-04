export const layer2ManagerFunctionsOfTypeA = [
];

export const layer2ManagerFunctionsOfTypeB = [
  {
    'params': {
      'aboutParam0': 'address _l1BridgeRegistry: The l1BridgeRegistry address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
      'aboutParam1': 'address _operatorManagerFactory: The operatorManagerFactory address',
      'exampleParam1': '0x0000000000000000000000000000000000000000',
      'aboutParam2': 'address _ton: The ton address',
      'exampleParam2': '0x0000000000000000000000000000000000000000',
      'aboutParam3': 'address _wton: The wton address',
      'exampleParam3': '0x0000000000000000000000000000000000000000',
      'aboutParam4': 'address _dao: The dao address',
      'exampleParam4': '0x0000000000000000000000000000000000000000',
      'aboutParam5': 'address _depositManager: The depositManager address',
      'exampleParam5': '0x0000000000000000000000000000000000000000',
      'aboutParam6': 'address _seigManager: The seigManager address',
      'exampleParam6': '0x0000000000000000000000000000000000000000',
      'aboutParam7': 'address _swapProxy: The swapProxy address',
      'exampleParam7': '0x0000000000000000000000000000000000000000',
    },
    'name': 'setAddresses',
    'title': '(Layer2 Manager)Set addresses.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'This function allows you to set the addresses used in Layer2 Manager contract.',
  },
  {
    'params': {
      'aboutParam0': 'address _operatorManagerFactory: The operatorManagerFactory address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'setOperatorManagerFactory',
    'title': '(Layer2 Manager)Set an operatorManagerFactory contract address.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'This function allows you to set an operatorManagerFactory address as an input value (Param1)',
  },
  {
    'params': {
      'aboutParam0': 'address _minimumInitialDepositAmount: The minimum initial deposit amount',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'setMinimumInitialDepositAmount',
    'title': '(Layer2 Manager)Set a minimum initial deposit amount',
    'prettyName': '',
    'disabled': false,
    'explanation': `Set the minimum TON deposit amount required when creating a CandidateAddOn.
     *          Due to calculating swton, it is recommended to set DepositManager's minimum deposit + 0.1 TON`,
  },
  {
    'params': {
      'aboutParam0': 'the minimum initial deposit amount',
      'exampleParam0': '1000100000000000000000',
    },
    'name': 'setMinimumInitialDepositAmount',
    'title': '(Layer2 Manager) Set the minimum TON deposit amount required when creating a CandidateAddOn.',
    'prettyName': '',
    'disabled': false,
    'explanation': `Due to calculating swton, it is recommended to set DepositManager's minimum deposit + 0.1 TON`,
  },
];

