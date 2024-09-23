export const AUCTION_ABI = {
  "address": "0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc",
  "name": "proxirun",
  "friends": [],
  "exposed_functions": [
    {
      "name": "bid_work_request",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "u64",
        "u64"
      ],
      "return": []
    },
    {
      "name": "commit",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "u64"
      ],
      "return": []
    },
    {
      "name": "create_work_request",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "u64"
      ],
      "return": []
    },
    {
      "name": "deposit",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "u64"
      ],
      "return": []
    },
    {
      "name": "finalize_auction",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "u64"
      ],
      "return": []
    },
    {
      "name": "get_auction",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "u64"
      ],
      "return": [
        "0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc::proxirun::AuctionEntry"
      ]
    },
    {
      "name": "get_auction_settings",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [],
      "return": [
        "0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc::proxirun::AuctionSettings"
      ]
    },
    {
      "name": "get_batch_auction",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "vector<u64>"
      ],
      "return": [
        "vector<0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc::proxirun::AuctionEntry>"
      ]
    },
    {
      "name": "get_bids",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "u64"
      ],
      "return": [
        "vector<0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc::proxirun::Bid>"
      ]
    },
    {
      "name": "get_counter",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [],
      "return": [
        "u64"
      ]
    },
    {
      "name": "get_user_balance",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "address"
      ],
      "return": [
        "0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc::proxirun::UserBalanceEntry"
      ]
    },
    {
      "name": "get_work_request",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "u64"
      ],
      "return": [
        "0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc::proxirun::WorkRequest"
      ]
    },
    {
      "name": "update_auction_settings",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "u64"
      ],
      "return": []
    },
    {
      "name": "withdraw",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "u64"
      ],
      "return": []
    }
  ],
  "structs": [
    {
      "name": "AuctionEntry",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "copy",
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "status",
          "type": "u8"
        },
        {
          "name": "work_request",
          "type": "0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc::proxirun::WorkRequest"
        },
        {
          "name": "bids",
          "type": "vector<0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc::proxirun::Bid>"
        },
        {
          "name": "winner",
          "type": "0x1::option::Option<0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc::proxirun::Bid>"
        }
      ]
    },
    {
      "name": "AuctionSettings",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "copy",
        "drop",
        "key"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "auction_duration",
          "type": "u64"
        }
      ]
    },
    {
      "name": "AuctionTable",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "key"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "auction_entries",
          "type": "0x1::smart_vector::SmartVector<0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc::proxirun::AuctionEntry>"
        }
      ]
    },
    {
      "name": "Bid",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "copy",
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "bidder",
          "type": "address"
        },
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "Config",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "key"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "admin",
          "type": "address"
        },
        {
          "name": "bank_address",
          "type": "address"
        },
        {
          "name": "bank_signer",
          "type": "0x1::account::SignerCapability"
        }
      ]
    },
    {
      "name": "OnAuctionFailure",
      "is_native": false,
      "is_event": true,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "request_id",
          "type": "u64"
        }
      ]
    },
    {
      "name": "OnBidWon",
      "is_native": false,
      "is_event": true,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "request_id",
          "type": "u64"
        },
        {
          "name": "winner",
          "type": "address"
        },
        {
          "name": "bid_price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "OnNewWorkRequest",
      "is_native": false,
      "is_event": true,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "request_id",
          "type": "u64"
        },
        {
          "name": "requester",
          "type": "address"
        },
        {
          "name": "max_price",
          "type": "u64"
        },
        {
          "name": "time_limit",
          "type": "u64"
        }
      ]
    },
    {
      "name": "OnNewWorkRequestBid",
      "is_native": false,
      "is_event": true,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "request_id",
          "type": "u64"
        },
        {
          "name": "bidder",
          "type": "address"
        },
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "OnWorkRequestCompleted",
      "is_native": false,
      "is_event": true,
      "abilities": [
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "request_id",
          "type": "u64"
        }
      ]
    },
    {
      "name": "UserBalanceEntry",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "copy",
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "available",
          "type": "u64"
        },
        {
          "name": "locked",
          "type": "u64"
        }
      ]
    },
    {
      "name": "UserBalanceTable",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "key"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "user_balances",
          "type": "0x1::smart_table::SmartTable<address, 0x9476528b38675eaf7fcc4d18c9472f22efd24532cad25a27794c6f7300df06cc::proxirun::UserBalanceEntry>"
        }
      ]
    },
    {
      "name": "WorkRequest",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "copy",
        "drop",
        "store"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "requester",
          "type": "address"
        },
        {
          "name": "submission_time",
          "type": "u64"
        },
        {
          "name": "max_price",
          "type": "u64"
        }
      ]
    }
  ]
} as const