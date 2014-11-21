Karma (very) Verbose Reporter
=============================

To install, just get the tarball from GitHub via NPM:

```
npm install --save-dev 'karma-verbose-reporter'
```

This reporter logs everything emitted during the test phase:

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

Reports are also quite detailed:

```
Suites and tests results:

 - decode :
   * should exist : 4 ok
   * should fail decoding garbage : 4 ok
   * should fail decoding null data : 4 ok
   * should fail decoding with unknown algorithm : 4 ok
   * should handle nested promises : 4 ok
   - BASE64 :
     * decode : 4 ok
   - HEX :
     * decode lower case : 4 ok
     * decode upper case : 4 ok
   - UTF8 :
     * decode : 4 ok
 - defer :
   * should defer a static value : 4 ok
   * should exist : 4 ok
   * should reject a thrown error : 4 ok
   * should reject a thrown string : 4 ok
   * should reject a wrapped rejected promise : 4 ok
   * should resolve a deferred function : 4 ok
   * should resolve a wrapped resolved promise : 4 ok
 - encode :
   * should exist : 4 ok
   * should fail encoding garbage : 4 ok
   * should fail encoding null data : 4 ok
   * should fail encoding with unknown algorithm : 4 ok
   * should handle nested promises : 4 ok
   - BASE64 :
     * encode : 4 ok
   - HEX :
     * encode : 4 ok
   - UTF8 :
     * encode Uint8Array : 4 ok
     * encode plain array : 4 ok
     * encode string (pass-through) : 4 ok
 - hash :
   * should exist : 4 ok
   - SHA-1 :
     * should hash 10k of binary data : 4 ok
     * should hash a well-known string : 4 ok
     * should hash empty data : 4 ok
   - SHA-224 :
     * should hash 10k of binary data : 4 ok
     * should hash a well-known string : 4 ok
     * should hash empty data : 4 ok
   - SHA-256 :
     * should hash 10k of binary data : 4 ok
     * should hash a well-known string : 4 ok
     * should hash empty data : 4 ok
   - SHA-384 :
     * should hash 10k of binary data : 4 ok
     * should hash a well-known string : 4 ok
     * should hash empty data : 4 ok
   - SHA-512 :
     * should hash 10k of binary data : 4 ok
     * should hash a well-known string : 4 ok
     * should hash empty data : 4 ok
 - subtle :
   * should digest : 2 ok, 2 skipped
   * should exist : 4 ok

Browser results:

 - Safari 8.0.0 (Mac OS X 10.10): 44 tests
   - 44 ok
 - Chrome 39.0.2171 (Mac OS X 10.10.0): 44 tests
   - 44 ok
 - PhantomJS 1.9.7 (Mac OS X): 44 tests
   - 43 ok, 1 skipped
 - Firefox 33.0.0 (Mac OS X 10.10): 44 tests
   - 43 ok, 1 skipped
```
