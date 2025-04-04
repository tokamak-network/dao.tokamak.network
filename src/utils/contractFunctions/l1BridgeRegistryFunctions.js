export const l1BridgeRegistryFunctionsOfTypeA = [
  {
    'params': {
      'aboutParam0': 'address rollupConfig: the rollupConfig address',
      'exampleParam0': '100000000000000000000000000',
      'aboutParam1': 'uint8 _type: the rollup\'s type, 1: legacy, 2: optimism bedrock with the native TON',
      'exampleParam1': '1',
      'aboutParam2': `address _l2TON: the L2 TON address.
                 if _type equals 2,  _l2TON should be '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'`,
      'exampleParam2': '0x0000000000000000000000000000000000000000',
      'aboutParam3': 'string _name: the display name of candidate',
      'exampleParam3': 'My DAO',
    },
    'name': 'registerRollupConfigByManager',
    'title': '(L1 Bridge Registry)Register a candidate for a specific rollupConfig by the manager.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'This function allows you to register a candidate for a specific rollupConfig by the manager.',
  },
  {
    'params': {
      'aboutParam0': 'address rollupConfig: the rollupConfig address',
      'exampleParam0': '100000000000000000000000000',
      'aboutParam1': 'uint8 _type: the rollup\'s type, 1: legacy, 2: optimism bedrock with the native TON',
      'exampleParam1': '1',
      'aboutParam2': `address _l2TON: the L2 TON address.
                 if _type equals 2,  _l2TON should be '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'`,
      'exampleParam2': '0x0000000000000000000000000000000000000000',
      'aboutParam3': 'string _name: the display name of candidate',
      'exampleParam3': 'My DAO',
    },
    'name': 'registerRollupConfig',
    'title': '(L1 Bridge Registry)Register a candidate for a specific rollupConfig by an registrant.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'This function allows you to register a candidate for a specific rollupConfig by an registrant.',
  },
  {
    'params': {
      'aboutParam0': 'Address of registrant to register',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'addRegistrant',
    'title': '(L1 Bridge Registry) Add a registrant',
    'prettyName': '',
    'disabled': false,
    'explanation': 'An account with registrant permission in the L1BridgeRegistry contract can register RollupConfig, which holds unique information about Layer2. Registering RollupConfig means ensuring that there are no issues in Layer2. Only the registered RollupConfig can be registered as CandidateAddOn. Only after being registered as CandidateAddOn can the sequencer(seigniorageReceiver) receive seigniorage.',
  },
  {
    'params': {
      'aboutParam0': 'Address to set to _seigniorageCommittee',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'setSeigniorageCommittee',
    'title': '(L1 Bridge Registry) Add a seigniorageCommittee.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'Simple Staking V2 designed an economy that issues TON seigniorage to CandidateAddOn\'s OperatorManager. The layer 2 operator(OperatorManager.manager() , Set to RollupConfig\'s unsafeBlockSigner() when registering) can claim the seigniorage stored in the OperatorManager contract. Just in case, we must have a function to stop issuing TON seigniorage to OperatorManager. A SeigniorageCommittee account was created in the L1BridgeRegistry contract. The SeigniorageCommittee can perform the function of suspending issuance of seigniorage or canceling suspension of issuance for a sequencer in a specific CandidateAddOn.',
  },
  {
    'params': {
      'aboutParam0': 'Address of registrant to register',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'addRegistrant',
    'title': '(L1 Bridge Registry) Add a registrant',
    'prettyName': '',
    'disabled': false,
    'explanation': 'An account with registrant permission in the L1BridgeRegistry contract can register RollupConfig, which holds unique information about Layer2. Registering RollupConfig means ensuring that there are no issues in Layer2. Only the registered RollupConfig can be registered as CandidateAddOn. Only after being registered as CandidateAddOn can the sequencer(seigniorageReceiver) receive seigniorage.',
  },
  {
    'params': {
      'aboutParam0': 'the rollupConfig address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
      'aboutParam1': '1: optimism rollup legacy version, 2: Thanos in Tokamak Rollup Hub',
      'exampleParam1': '2',
      'aboutParam2': 'TON address in Layer2',
      'exampleParam2': '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
      'aboutParam3': 'Name of Layer2',
      'exampleParam3': 'Tokamak Layer2 ',
    },
    'name': 'registerRollupConfigByManager',
    'title': '(L1 Bridge Registry) Registers a specific rollupConfig by the manager. ',
    'prettyName': '',
    'disabled': false,
    'explanation': 'Only the registered RollupConfig can be registered as CandidateAddOn. Only after being registered as CandidateAddOn can the sequencer(seigniorageReceiver) receive seigniorage.',
  },
  // {
  //   'params': {
  //     'aboutParam0': 'the rollupConfig address',
  //     'exampleParam0': '0x0000000000000000000000000000000000000000',
  //     'aboutParam1': '1: optimism rollup legacy version, 2: Thanos in Tokamak Rollup Hub',
  //     'exampleParam1': '2',
  //     'aboutParam2': 'TON address in Layer2',
  //     'exampleParam2': '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
  //   },
  //   'name': 'registerRollupConfigByManager',
  //   'title': '(L1 Bridge Registry) Registers a specific rollupConfig by the manager. ',
  //   'prettyName': '',
  //   'disabled': false,
  //   'explanation': 'Only the registered RollupConfig can be registered as CandidateAddOn. Only after being registered as CandidateAddOn can the sequencer(seigniorageReceiver) receive seigniorage.',
  // },
  {
    'params': {
      'aboutParam0': 'rollupConfig contract address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'rejectCandidateAddOn',
    'title': '(L1 Bridge Registry) Stop issuing seigniorage to the layer 2 sequencer of a specific rollupConfig. ',
    'prettyName': '',
    'disabled': false,
    'explanation': 'Stop issuing seigniorage to the layer 2 sequencer of a specific rollupConfig. ',
  },
  {
    'params': {
      'aboutParam0': 'rollupConfig contract address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
      'aboutParam1': 'if it is true, allow the withdrawDepositL2 function.',
      'exampleParam1': 'true',
    },
    'name': 'restoreCandidateAddOn',
    'title': '(L1 Bridge Registry) Cancel stopping seigniorage to the layer 2 sequencer of a specific rollupConfig.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'Cancel stopping seigniorage to the layer 2 sequencer of a specific rollupConfig.',
  },
];

export const l1BridgeRegistryFunctionsOfTypeB = [
  {
    'params': {
      'aboutParam0': 'address _layer2Manager: The layer2Manager address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
      'aboutParam1': 'address _seigManager: The seigManager address',
      'exampleParam1': '0x0000000000000000000000000000000000000000',
      'aboutParam2': 'address _ton: The ton address',
      'exampleParam2': '0x0000000000000000000000000000000000000000',
    },
    'name': 'setAddresses',
    'title': '(L1 Bridge Registry)Set layer2Manager, seigManager and TON addresses',
    'prettyName': '',
    'disabled': false,
    'explanation': 'This function allows you to set The L2Bridge Registry Address(Param0), SeigManager address(Param1) and TON address (Param2).',
  },
  {
    'params': {
      'aboutParam0': 'address _seigniorageCommittee: The seigniorage committee address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'setSeigniorageCommittee',
    'title': '(L1 Bridge Registry)Set the seigniorageCommittee address.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'This function allows you to set the seigniorage committee address(Param0).',
  },
  {
    'params': {
      'aboutParam0': 'address rollupConfig: The rollup config contract address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'rejectCandidateAddOn',
    'title': '(L1 Bridge Registry)Stop issuing seigniorage to the layer 2 sequencer of a specific rollupConfig.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'This function allows you to stop issuing seigniorage to the layer 2 sequencer of a specific rollupConfig.',
  },
  {
    'params': {
      'aboutParam0': 'address rollupConfig: The rollup config contract address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
      'aboutParam1': 'bool rejectedL2Deposit: if it is true, allow the withdrawDepositL2 function.',
      'exampleParam1': '0x0000000000000000000000000000000000000000',
    },
    'name': 'restoreCandidateAddOn',
    'title': '(L1 Bridge Registry)Restore cancel stopping seigniorage to the layer 2 sequencer of a specific rollupConfig.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'This function allows you to restore cancel stopping seigniorage to the layer 2 sequencer of a specific rollupConfig.',
  },
  {
    'params': {
      'aboutParam0': 'address rollupConfig: the rollupConfig address',
      'exampleParam0': '100000000000000000000000000',
      'aboutParam1': 'uint8 _type: the rollup\'s type, 1: legacy, 2: optimism bedrock with the native TON',
      'exampleParam1': '1',
      'aboutParam2': `address _l2TON: the L2 TON address.
                 if _type equals 2,  _l2TON should be '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'`,
      'exampleParam2': '0x0000000000000000000000000000000000000000',
      'aboutParam3': 'string _name: the display name of candidate',
      'exampleParam3': 'My DAO',
    },
    'name': 'changeType',
    'title': '(L1 Bridge Registry)Changes the Layer2 information for a specific rollupConfig by Registrant.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'This function allows you to change the Layer2 information for a specific rollupConfig by Registrant.',
  },
  {
    'params': {
      'aboutParam0': 'bool _pause: Whether to stop (True:1/ False:0)',
      'exampleParam0': '1',
    },
    'name': 'setProxyPause',
    'title': '(L1 Bridge Registry)It will be decided whether to stop the L1 Bridge Registry.',
    'prettyName': '',
    'disabled': false,
    'explanation':
`Owners have the right to stop the L1 Bridge Registry. This function allows the owner to decide whether to stop the L1 Bridge Registry.
If the first Param1 value is true, the L1 Bridge Registry stops, and if it is false, it operates normally.`,
  },
  {
    'params': {
      'aboutParam0': 'address impl: New L1 Bridge Registry Logic contract address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'upgradeTo',
    'title': '(L1 Bridge Registry)Address of the L1 Bridge Registry contract will be upgraded. ',
    'prettyName': '',
    'disabled': false,
    'explanation':
`This function sets the new address of the L1 Bridge Registry contract to be upgraded. Enter the L1 Bridge Registry contract address to be upgraded in the first parameter (Param1).
It will be used when the L1 Bridge Registry is upgraded.`,
  },
  {
    'params': {
      'aboutParam0': 'address account: New registrant address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'addRegistrant',
    'title': '(L1 Bridge Registry)Add an account with registration privileges.',
    'prettyName': '',
    'disabled': false,
    'explanation':
'The feature adds a new account with permission to register rollupConfig contracts to the L1 Bridge Registry contract.',
  },
  {
    'params': {
      'aboutParam0': 'address account: New manager address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'addManager',
    'title': '(L1 Bridge Registry)Add a manager account.',
    'prettyName': '',
    'disabled': false,
    'explanation':
'This feature allows you to add a manager account that can manage your registered accounts.',
  },
  {
    'params': {
      'aboutParam0': 'address account: An admin address',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
    },
    'name': 'addAdmin',
    'title': '(L1 Bridge Registry)Add an admin account.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'This feature allows you to add owners to a contract.',
  },
  {
    'params': {
      'aboutParam0': 'the layerManager contract address ',
      'exampleParam0': '0x0000000000000000000000000000000000000000',
      'aboutParam1': 'the seigManager contract address',
      'exampleParam1': '0x0000000000000000000000000000000000000000',
      'aboutParam2': 'address ton',
      'exampleParam2': '0x0000000000000000000000000000000000000000',
    },
    'name': 'setAddresses',
    'title': '(L1 Bridge Registry) Set layerManager, seigManager, and ton addresses.',
    'prettyName': '',
    'disabled': false,
    'explanation': 'Set layerManager, seigManager, and ton addresses.',
  },
];
