export type ISolanaNumFlux = {
  "address": "FFa222U5TqycjB4EBYF26NXMyrZHBoLNPMH842oLjHrV",
  "metadata": {
    "name": "solanaNumFlux",
    "version": "0.2.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initializeStoredNum",
      "discriminator": [
        231,
        54,
        107,
        231,
        207,
        180,
        197,
        11
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "userProfile"
          ]
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  85,
                  83,
                  69,
                  82,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "storedNumAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  83,
                  84,
                  79,
                  82,
                  69,
                  68,
                  95,
                  78,
                  85,
                  77,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "historyAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  72,
                  73,
                  83,
                  84,
                  79,
                  82,
                  89,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeUser",
      "discriminator": [
        111,
        17,
        185,
        250,
        60,
        122,
        38,
        254
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  85,
                  83,
                  69,
                  82,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "shiftStoredNum",
      "discriminator": [
        240,
        184,
        70,
        133,
        66,
        215,
        13,
        57
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "userProfile",
            "storedNumAccount",
            "historyAccount"
          ]
        },
        {
          "name": "userProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  85,
                  83,
                  69,
                  82,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "storedNumAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  83,
                  84,
                  79,
                  82,
                  69,
                  68,
                  95,
                  78,
                  85,
                  77,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "historyAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  72,
                  73,
                  83,
                  84,
                  79,
                  82,
                  89,
                  95,
                  83,
                  84,
                  65,
                  84,
                  69
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "direction",
          "type": {
            "defined": {
              "name": "shiftDirection"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "historyAccount",
      "discriminator": [
        181,
        163,
        222,
        254,
        117,
        87,
        93,
        83
      ]
    },
    {
      "name": "storedNumAccount",
      "discriminator": [
        19,
        210,
        14,
        98,
        198,
        118,
        39,
        111
      ]
    },
    {
      "name": "userProfile",
      "discriminator": [
        32,
        37,
        119,
        205,
        179,
        180,
        13,
        194
      ]
    }
  ],
  "types": [
    {
      "name": "historyAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "records",
            "type": {
              "vec": {
                "defined": {
                  "name": "operationsRecord"
                }
              }
            }
          }
        ]
      }
    },
    {
      "name": "operationsRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "finalValue",
            "type": "u64"
          },
          {
            "name": "shiftDirection",
            "type": {
              "defined": {
                "name": "shiftDirection"
              }
            }
          }
        ]
      }
    },
    {
      "name": "shiftDirection",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "increment"
          },
          {
            "name": "decrement"
          }
        ]
      }
    },
    {
      "name": "storedNumAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "storedNum",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userProfile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "historyTag",
      "type": "bytes",
      "value": "[72, 73, 83, 84, 79, 82, 89, 95, 83, 84, 65, 84, 69]"
    },
    {
      "name": "storedNumTag",
      "type": "bytes",
      "value": "[83, 84, 79, 82, 69, 68, 95, 78, 85, 77, 95, 83, 84, 65, 84, 69]"
    },
    {
      "name": "userTag",
      "type": "bytes",
      "value": "[85, 83, 69, 82, 95, 83, 84, 65, 84, 69]"
    }
  ]
};
