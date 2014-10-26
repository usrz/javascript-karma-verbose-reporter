Karma (very) Verbose Reporter
=============================

Basically, this reporter logs everything emitted during the test phase:

```
...
INFO [Safari 8.0.0 (Mac OS X 10.10) | hash, SHA-256 | should hash empty data]: Success: 4 ms
INFO [Safari 8.0.0 (Mac OS X 10.10) | hash, SHA-256 | should hash a well-known string]: Success: 9 ms
INFO [Firefox 33.0.0 (Mac OS X 10.10) | decode, UTF8 | decode]: Success: 9 ms
INFO [Safari 8.0.0 (Mac OS X 10.10) | hash, SHA-256 | should hash 10k of binary data]: Success: 13 ms
INFO [Firefox 33.0.0 (Mac OS X 10.10) | decode, HEX | decode lower case]: Success: 10 ms
INFO [PhantomJS 1.9.7 (Mac OS X) | defer | should reject a wrapped rejected promise]: Success: 35 ms
INFO [Safari 8.0.0 (Mac OS X 10.10) | hash, SHA-384 | should hash empty data]: Success: 3 ms
INFO [Safari 8.0.0 (Mac OS X 10.10) | hash, SHA-384 | should hash a well-known string]: Success: 7 ms
INFO [Firefox 33.0.0 (Mac OS X 10.10) | decode, HEX | decode upper case]: Success: 11 ms
...
```
