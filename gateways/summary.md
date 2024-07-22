
# Compatibility Results

## Summary

|  Gateway   | Compatibility | Success/Failure |
| :--------: | :-----------: | :-------------: |
| router | 100% | 160/160 |
| router-new | 96% | 153/160 |
| mesh | 96% | 153/160 |
| cosmo | 63% | 100/160 |
| grafbase | 46% | 74/160 |


## Detailed Results

Take a closer look at the results for each gateway.

Here's an example result:

```
abstract-types
...X.X..
```

This means that the test `abstract-types` failed on the 2nd, 4th, and 6th queries.

The `.` symbol represents a successful test, while the `X` symbol represents a failed test.

You can look at the full list of tests [here](../src/test-cases/). Every test id corresponds to a directory in the `src/test-cases` folder.

### router

<details>
<pre>
abstract-types
.................
child-type-mismatch
....
circular-reference-interface
..
complex-entity-call
.
corrupted-supergraph-node-id
..........
enum-intersection
.....
fed1-external-extends
..
fed1-external-extends-resolvable
.
fed1-external-extension
..
fed2-external-extends
..
fed2-external-extension
..
include-skip
....
input-object-intersection
...
interface-object-with-requires
.......
mutations
...
mysterious-external
..
nested-provides
..
non-resolvable-interface-object
.......
override-type-interface
....
override-with-requires
....
parent-entity-call
.
parent-entity-call-complex
.
provides-on-interface
..
provides-on-union
..
requires-interface
.....
requires-requires
...
requires-with-fragments
......
shared-root
..
simple-entity-call
.
simple-inaccessible
....
simple-interface-object
.............
simple-override
..
simple-requires-provides
...........
typename
......
unavailable-override
..
union-interface-distributed
.......
union-intersection
........
</pre>
</details>


### router-new

<details>
<pre>
abstract-types
..............X..
child-type-mismatch
....
circular-reference-interface
..
complex-entity-call
.
corrupted-supergraph-node-id
..........
enum-intersection
.....
fed1-external-extends
..
fed1-external-extends-resolvable
.
fed1-external-extension
..
fed2-external-extends
..
fed2-external-extension
..
include-skip
....
input-object-intersection
...
interface-object-with-requires
.......
mutations
..X
mysterious-external
..
nested-provides
..
non-resolvable-interface-object
.......
override-type-interface
....
override-with-requires
....
parent-entity-call
.
parent-entity-call-complex
.
provides-on-interface
..
provides-on-union
..
requires-interface
.....
requires-requires
...
requires-with-fragments
......
shared-root
..
simple-entity-call
.
simple-inaccessible
....
simple-interface-object
.X..XXX.X....
simple-override
..
simple-requires-provides
...........
typename
......
unavailable-override
..
union-interface-distributed
.......
union-intersection
........
</pre>
</details>


### mesh

<details>
<pre>
abstract-types
.................
child-type-mismatch
....
circular-reference-interface
..
complex-entity-call
.
corrupted-supergraph-node-id
X....X....
enum-intersection
..X..
fed1-external-extends
..
fed1-external-extends-resolvable
.
fed1-external-extension
..
fed2-external-extends
..
fed2-external-extension
..
include-skip
....
input-object-intersection
...
interface-object-with-requires
.......
mutations
...
mysterious-external
..
nested-provides
..
non-resolvable-interface-object
.X.....
override-type-interface
....
override-with-requires
....
parent-entity-call
.
parent-entity-call-complex
.
provides-on-interface
..
provides-on-union
..
requires-interface
.....
requires-requires
...
requires-with-fragments
X...X.
shared-root
..
simple-entity-call
.
simple-inaccessible
...X
simple-interface-object
.............
simple-override
..
simple-requires-provides
...........
typename
......
unavailable-override
..
union-interface-distributed
.......
union-intersection
........
</pre>
</details>


### cosmo

<details>
<pre>
abstract-types
XXXXXXXXXXXXXXXXX
child-type-mismatch
XXX.
circular-reference-interface
..
complex-entity-call
X
corrupted-supergraph-node-id
.XXXX.XXXX
enum-intersection
..X..
fed1-external-extends
..
fed1-external-extends-resolvable
.
fed1-external-extension
..
fed2-external-extends
..
fed2-external-extension
..
include-skip
....
input-object-intersection
...
interface-object-with-requires
XX..XXX
mutations
..X
mysterious-external
..
nested-provides
XX
non-resolvable-interface-object
.......
override-type-interface
.X..
override-with-requires
....
parent-entity-call
X
parent-entity-call-complex
X
provides-on-interface
..
provides-on-union
..
requires-interface
..X..
requires-requires
...
requires-with-fragments
XXXXXX
shared-root
.X
simple-entity-call
.
simple-inaccessible
...X
simple-interface-object
........X....
simple-override
..
simple-requires-provides
...........
typename
......
unavailable-override
..
union-interface-distributed
X......
union-intersection
XXXXXXXX
</pre>
</details>


### grafbase

<details>
<pre>
abstract-types
..X..XXXXXXXXXXXX
child-type-mismatch
XXX.
circular-reference-interface
..
complex-entity-call
X
corrupted-supergraph-node-id
XXXXX.....
enum-intersection
..X..
fed1-external-extends
..
fed1-external-extends-resolvable
X
fed1-external-extension
..
fed2-external-extends
..
fed2-external-extension
..
include-skip
XXXX
input-object-intersection
...
interface-object-with-requires
..X.XXX
mutations
...
mysterious-external
..
nested-provides
XX
non-resolvable-interface-object
X.X...X
override-type-interface
XX..
override-with-requires
.XXX
parent-entity-call
X
parent-entity-call-complex
X
provides-on-interface
XX
provides-on-union
..
requires-interface
XXXXX
requires-requires
XXX
requires-with-fragments
XXXXXX
shared-root
XX
simple-entity-call
.
simple-inaccessible
..XX
simple-interface-object
..X.XXX.XXXXX
simple-override
X.
simple-requires-provides
..........X
typename
......
unavailable-override
X.
union-interface-distributed
XX.....
union-intersection
XXXXXXXX
</pre>
</details>


