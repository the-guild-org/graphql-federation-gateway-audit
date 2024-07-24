
# Compatibility Results

## Summary

|  Gateway   | Compatibility | Success/Failure |
| :--------: | :-----------: | :-------------: |
| mesh | 100% | 160/160 |
| router | 100% | 160/160 |
| router-new | 96% | 153/160 |
| cosmo | 63% | 100/160 |
| grafbase | 46% | 74/160 |


## Detailed Results

Take a closer look at the results for each gateway.

Here's an example result:

```
abstract-types
...X.X..
```

This means that the test `abstract-types` failed on the 4th and 6th test case, while the rest passed.

The `.` symbol represents a successful test, while the `X` symbol represents a failed test.

You can look at the full list of tests [here](../src/test-cases/). Every test id corresponds to a directory in the `src/test-cases` folder.

### mesh

<details>
<summary>Results</summary>
<a href="../src/test-cases/abstract-types">abstract-types</a>
<pre>.................</pre>
<a href="../src/test-cases/child-type-mismatch">child-type-mismatch</a>
<pre>....</pre>
<a href="../src/test-cases/circular-reference-interface">circular-reference-interface</a>
<pre>..</pre>
<a href="../src/test-cases/complex-entity-call">complex-entity-call</a>
<pre>.</pre>
<a href="../src/test-cases/corrupted-supergraph-node-id">corrupted-supergraph-node-id</a>
<pre>..........</pre>
<a href="../src/test-cases/enum-intersection">enum-intersection</a>
<pre>.....</pre>
<a href="../src/test-cases/fed1-external-extends">fed1-external-extends</a>
<pre>..</pre>
<a href="../src/test-cases/fed1-external-extends-resolvable">fed1-external-extends-resolvable</a>
<pre>.</pre>
<a href="../src/test-cases/fed1-external-extension">fed1-external-extension</a>
<pre>..</pre>
<a href="../src/test-cases/fed2-external-extends">fed2-external-extends</a>
<pre>..</pre>
<a href="../src/test-cases/fed2-external-extension">fed2-external-extension</a>
<pre>..</pre>
<a href="../src/test-cases/include-skip">include-skip</a>
<pre>....</pre>
<a href="../src/test-cases/input-object-intersection">input-object-intersection</a>
<pre>...</pre>
<a href="../src/test-cases/interface-object-with-requires">interface-object-with-requires</a>
<pre>.......</pre>
<a href="../src/test-cases/mutations">mutations</a>
<pre>...</pre>
<a href="../src/test-cases/mysterious-external">mysterious-external</a>
<pre>..</pre>
<a href="../src/test-cases/nested-provides">nested-provides</a>
<pre>..</pre>
<a href="../src/test-cases/non-resolvable-interface-object">non-resolvable-interface-object</a>
<pre>.......</pre>
<a href="../src/test-cases/override-type-interface">override-type-interface</a>
<pre>....</pre>
<a href="../src/test-cases/override-with-requires">override-with-requires</a>
<pre>....</pre>
<a href="../src/test-cases/parent-entity-call">parent-entity-call</a>
<pre>.</pre>
<a href="../src/test-cases/parent-entity-call-complex">parent-entity-call-complex</a>
<pre>.</pre>
<a href="../src/test-cases/provides-on-interface">provides-on-interface</a>
<pre>..</pre>
<a href="../src/test-cases/provides-on-union">provides-on-union</a>
<pre>..</pre>
<a href="../src/test-cases/requires-interface">requires-interface</a>
<pre>.....</pre>
<a href="../src/test-cases/requires-requires">requires-requires</a>
<pre>...</pre>
<a href="../src/test-cases/requires-with-fragments">requires-with-fragments</a>
<pre>......</pre>
<a href="../src/test-cases/shared-root">shared-root</a>
<pre>..</pre>
<a href="../src/test-cases/simple-entity-call">simple-entity-call</a>
<pre>.</pre>
<a href="../src/test-cases/simple-inaccessible">simple-inaccessible</a>
<pre>....</pre>
<a href="../src/test-cases/simple-interface-object">simple-interface-object</a>
<pre>.............</pre>
<a href="../src/test-cases/simple-override">simple-override</a>
<pre>..</pre>
<a href="../src/test-cases/simple-requires-provides">simple-requires-provides</a>
<pre>...........</pre>
<a href="../src/test-cases/typename">typename</a>
<pre>......</pre>
<a href="../src/test-cases/unavailable-override">unavailable-override</a>
<pre>..</pre>
<a href="../src/test-cases/union-interface-distributed">union-interface-distributed</a>
<pre>.......</pre>
<a href="../src/test-cases/union-intersection">union-intersection</a>
<pre>........</pre>

</details>

### router

<details>
<summary>Results</summary>
<a href="../src/test-cases/abstract-types">abstract-types</a>
<pre>.................</pre>
<a href="../src/test-cases/child-type-mismatch">child-type-mismatch</a>
<pre>....</pre>
<a href="../src/test-cases/circular-reference-interface">circular-reference-interface</a>
<pre>..</pre>
<a href="../src/test-cases/complex-entity-call">complex-entity-call</a>
<pre>.</pre>
<a href="../src/test-cases/corrupted-supergraph-node-id">corrupted-supergraph-node-id</a>
<pre>..........</pre>
<a href="../src/test-cases/enum-intersection">enum-intersection</a>
<pre>.....</pre>
<a href="../src/test-cases/fed1-external-extends">fed1-external-extends</a>
<pre>..</pre>
<a href="../src/test-cases/fed1-external-extends-resolvable">fed1-external-extends-resolvable</a>
<pre>.</pre>
<a href="../src/test-cases/fed1-external-extension">fed1-external-extension</a>
<pre>..</pre>
<a href="../src/test-cases/fed2-external-extends">fed2-external-extends</a>
<pre>..</pre>
<a href="../src/test-cases/fed2-external-extension">fed2-external-extension</a>
<pre>..</pre>
<a href="../src/test-cases/include-skip">include-skip</a>
<pre>....</pre>
<a href="../src/test-cases/input-object-intersection">input-object-intersection</a>
<pre>...</pre>
<a href="../src/test-cases/interface-object-with-requires">interface-object-with-requires</a>
<pre>.......</pre>
<a href="../src/test-cases/mutations">mutations</a>
<pre>...</pre>
<a href="../src/test-cases/mysterious-external">mysterious-external</a>
<pre>..</pre>
<a href="../src/test-cases/nested-provides">nested-provides</a>
<pre>..</pre>
<a href="../src/test-cases/non-resolvable-interface-object">non-resolvable-interface-object</a>
<pre>.......</pre>
<a href="../src/test-cases/override-type-interface">override-type-interface</a>
<pre>....</pre>
<a href="../src/test-cases/override-with-requires">override-with-requires</a>
<pre>....</pre>
<a href="../src/test-cases/parent-entity-call">parent-entity-call</a>
<pre>.</pre>
<a href="../src/test-cases/parent-entity-call-complex">parent-entity-call-complex</a>
<pre>.</pre>
<a href="../src/test-cases/provides-on-interface">provides-on-interface</a>
<pre>..</pre>
<a href="../src/test-cases/provides-on-union">provides-on-union</a>
<pre>..</pre>
<a href="../src/test-cases/requires-interface">requires-interface</a>
<pre>.....</pre>
<a href="../src/test-cases/requires-requires">requires-requires</a>
<pre>...</pre>
<a href="../src/test-cases/requires-with-fragments">requires-with-fragments</a>
<pre>......</pre>
<a href="../src/test-cases/shared-root">shared-root</a>
<pre>..</pre>
<a href="../src/test-cases/simple-entity-call">simple-entity-call</a>
<pre>.</pre>
<a href="../src/test-cases/simple-inaccessible">simple-inaccessible</a>
<pre>....</pre>
<a href="../src/test-cases/simple-interface-object">simple-interface-object</a>
<pre>.............</pre>
<a href="../src/test-cases/simple-override">simple-override</a>
<pre>..</pre>
<a href="../src/test-cases/simple-requires-provides">simple-requires-provides</a>
<pre>...........</pre>
<a href="../src/test-cases/typename">typename</a>
<pre>......</pre>
<a href="../src/test-cases/unavailable-override">unavailable-override</a>
<pre>..</pre>
<a href="../src/test-cases/union-interface-distributed">union-interface-distributed</a>
<pre>.......</pre>
<a href="../src/test-cases/union-intersection">union-intersection</a>
<pre>........</pre>

</details>

### router-new

<details>
<summary>Results</summary>
<a href="../src/test-cases/abstract-types">abstract-types</a>
<pre>..............X..</pre>
<a href="../src/test-cases/child-type-mismatch">child-type-mismatch</a>
<pre>....</pre>
<a href="../src/test-cases/circular-reference-interface">circular-reference-interface</a>
<pre>..</pre>
<a href="../src/test-cases/complex-entity-call">complex-entity-call</a>
<pre>.</pre>
<a href="../src/test-cases/corrupted-supergraph-node-id">corrupted-supergraph-node-id</a>
<pre>..........</pre>
<a href="../src/test-cases/enum-intersection">enum-intersection</a>
<pre>.....</pre>
<a href="../src/test-cases/fed1-external-extends">fed1-external-extends</a>
<pre>..</pre>
<a href="../src/test-cases/fed1-external-extends-resolvable">fed1-external-extends-resolvable</a>
<pre>.</pre>
<a href="../src/test-cases/fed1-external-extension">fed1-external-extension</a>
<pre>..</pre>
<a href="../src/test-cases/fed2-external-extends">fed2-external-extends</a>
<pre>..</pre>
<a href="../src/test-cases/fed2-external-extension">fed2-external-extension</a>
<pre>..</pre>
<a href="../src/test-cases/include-skip">include-skip</a>
<pre>....</pre>
<a href="../src/test-cases/input-object-intersection">input-object-intersection</a>
<pre>...</pre>
<a href="../src/test-cases/interface-object-with-requires">interface-object-with-requires</a>
<pre>.......</pre>
<a href="../src/test-cases/mutations">mutations</a>
<pre>..X</pre>
<a href="../src/test-cases/mysterious-external">mysterious-external</a>
<pre>..</pre>
<a href="../src/test-cases/nested-provides">nested-provides</a>
<pre>..</pre>
<a href="../src/test-cases/non-resolvable-interface-object">non-resolvable-interface-object</a>
<pre>.......</pre>
<a href="../src/test-cases/override-type-interface">override-type-interface</a>
<pre>....</pre>
<a href="../src/test-cases/override-with-requires">override-with-requires</a>
<pre>....</pre>
<a href="../src/test-cases/parent-entity-call">parent-entity-call</a>
<pre>.</pre>
<a href="../src/test-cases/parent-entity-call-complex">parent-entity-call-complex</a>
<pre>.</pre>
<a href="../src/test-cases/provides-on-interface">provides-on-interface</a>
<pre>..</pre>
<a href="../src/test-cases/provides-on-union">provides-on-union</a>
<pre>..</pre>
<a href="../src/test-cases/requires-interface">requires-interface</a>
<pre>.....</pre>
<a href="../src/test-cases/requires-requires">requires-requires</a>
<pre>...</pre>
<a href="../src/test-cases/requires-with-fragments">requires-with-fragments</a>
<pre>......</pre>
<a href="../src/test-cases/shared-root">shared-root</a>
<pre>..</pre>
<a href="../src/test-cases/simple-entity-call">simple-entity-call</a>
<pre>.</pre>
<a href="../src/test-cases/simple-inaccessible">simple-inaccessible</a>
<pre>....</pre>
<a href="../src/test-cases/simple-interface-object">simple-interface-object</a>
<pre>.X..XXX.X....</pre>
<a href="../src/test-cases/simple-override">simple-override</a>
<pre>..</pre>
<a href="../src/test-cases/simple-requires-provides">simple-requires-provides</a>
<pre>...........</pre>
<a href="../src/test-cases/typename">typename</a>
<pre>......</pre>
<a href="../src/test-cases/unavailable-override">unavailable-override</a>
<pre>..</pre>
<a href="../src/test-cases/union-interface-distributed">union-interface-distributed</a>
<pre>.......</pre>
<a href="../src/test-cases/union-intersection">union-intersection</a>
<pre>........</pre>

</details>

### cosmo

<details>
<summary>Results</summary>
<a href="../src/test-cases/abstract-types">abstract-types</a>
<pre>XXXXXXXXXXXXXXXXX</pre>
<a href="../src/test-cases/child-type-mismatch">child-type-mismatch</a>
<pre>XXX.</pre>
<a href="../src/test-cases/circular-reference-interface">circular-reference-interface</a>
<pre>..</pre>
<a href="../src/test-cases/complex-entity-call">complex-entity-call</a>
<pre>X</pre>
<a href="../src/test-cases/corrupted-supergraph-node-id">corrupted-supergraph-node-id</a>
<pre>.XXXX.XXXX</pre>
<a href="../src/test-cases/enum-intersection">enum-intersection</a>
<pre>..X..</pre>
<a href="../src/test-cases/fed1-external-extends">fed1-external-extends</a>
<pre>..</pre>
<a href="../src/test-cases/fed1-external-extends-resolvable">fed1-external-extends-resolvable</a>
<pre>.</pre>
<a href="../src/test-cases/fed1-external-extension">fed1-external-extension</a>
<pre>..</pre>
<a href="../src/test-cases/fed2-external-extends">fed2-external-extends</a>
<pre>..</pre>
<a href="../src/test-cases/fed2-external-extension">fed2-external-extension</a>
<pre>..</pre>
<a href="../src/test-cases/include-skip">include-skip</a>
<pre>....</pre>
<a href="../src/test-cases/input-object-intersection">input-object-intersection</a>
<pre>...</pre>
<a href="../src/test-cases/interface-object-with-requires">interface-object-with-requires</a>
<pre>XX..XXX</pre>
<a href="../src/test-cases/mutations">mutations</a>
<pre>..X</pre>
<a href="../src/test-cases/mysterious-external">mysterious-external</a>
<pre>..</pre>
<a href="../src/test-cases/nested-provides">nested-provides</a>
<pre>XX</pre>
<a href="../src/test-cases/non-resolvable-interface-object">non-resolvable-interface-object</a>
<pre>.......</pre>
<a href="../src/test-cases/override-type-interface">override-type-interface</a>
<pre>.X..</pre>
<a href="../src/test-cases/override-with-requires">override-with-requires</a>
<pre>....</pre>
<a href="../src/test-cases/parent-entity-call">parent-entity-call</a>
<pre>X</pre>
<a href="../src/test-cases/parent-entity-call-complex">parent-entity-call-complex</a>
<pre>X</pre>
<a href="../src/test-cases/provides-on-interface">provides-on-interface</a>
<pre>..</pre>
<a href="../src/test-cases/provides-on-union">provides-on-union</a>
<pre>..</pre>
<a href="../src/test-cases/requires-interface">requires-interface</a>
<pre>..X..</pre>
<a href="../src/test-cases/requires-requires">requires-requires</a>
<pre>...</pre>
<a href="../src/test-cases/requires-with-fragments">requires-with-fragments</a>
<pre>XXXXXX</pre>
<a href="../src/test-cases/shared-root">shared-root</a>
<pre>.X</pre>
<a href="../src/test-cases/simple-entity-call">simple-entity-call</a>
<pre>.</pre>
<a href="../src/test-cases/simple-inaccessible">simple-inaccessible</a>
<pre>...X</pre>
<a href="../src/test-cases/simple-interface-object">simple-interface-object</a>
<pre>........X....</pre>
<a href="../src/test-cases/simple-override">simple-override</a>
<pre>..</pre>
<a href="../src/test-cases/simple-requires-provides">simple-requires-provides</a>
<pre>...........</pre>
<a href="../src/test-cases/typename">typename</a>
<pre>......</pre>
<a href="../src/test-cases/unavailable-override">unavailable-override</a>
<pre>..</pre>
<a href="../src/test-cases/union-interface-distributed">union-interface-distributed</a>
<pre>X......</pre>
<a href="../src/test-cases/union-intersection">union-intersection</a>
<pre>XXXXXXXX</pre>

</details>

### grafbase

<details>
<summary>Results</summary>
<a href="../src/test-cases/abstract-types">abstract-types</a>
<pre>..X..XXXXXXXXXXXX</pre>
<a href="../src/test-cases/child-type-mismatch">child-type-mismatch</a>
<pre>XXX.</pre>
<a href="../src/test-cases/circular-reference-interface">circular-reference-interface</a>
<pre>..</pre>
<a href="../src/test-cases/complex-entity-call">complex-entity-call</a>
<pre>X</pre>
<a href="../src/test-cases/corrupted-supergraph-node-id">corrupted-supergraph-node-id</a>
<pre>XXXXX.....</pre>
<a href="../src/test-cases/enum-intersection">enum-intersection</a>
<pre>..X..</pre>
<a href="../src/test-cases/fed1-external-extends">fed1-external-extends</a>
<pre>..</pre>
<a href="../src/test-cases/fed1-external-extends-resolvable">fed1-external-extends-resolvable</a>
<pre>X</pre>
<a href="../src/test-cases/fed1-external-extension">fed1-external-extension</a>
<pre>..</pre>
<a href="../src/test-cases/fed2-external-extends">fed2-external-extends</a>
<pre>..</pre>
<a href="../src/test-cases/fed2-external-extension">fed2-external-extension</a>
<pre>..</pre>
<a href="../src/test-cases/include-skip">include-skip</a>
<pre>XXXX</pre>
<a href="../src/test-cases/input-object-intersection">input-object-intersection</a>
<pre>...</pre>
<a href="../src/test-cases/interface-object-with-requires">interface-object-with-requires</a>
<pre>..X.XXX</pre>
<a href="../src/test-cases/mutations">mutations</a>
<pre>...</pre>
<a href="../src/test-cases/mysterious-external">mysterious-external</a>
<pre>..</pre>
<a href="../src/test-cases/nested-provides">nested-provides</a>
<pre>XX</pre>
<a href="../src/test-cases/non-resolvable-interface-object">non-resolvable-interface-object</a>
<pre>X.X...X</pre>
<a href="../src/test-cases/override-type-interface">override-type-interface</a>
<pre>XX..</pre>
<a href="../src/test-cases/override-with-requires">override-with-requires</a>
<pre>.XXX</pre>
<a href="../src/test-cases/parent-entity-call">parent-entity-call</a>
<pre>X</pre>
<a href="../src/test-cases/parent-entity-call-complex">parent-entity-call-complex</a>
<pre>X</pre>
<a href="../src/test-cases/provides-on-interface">provides-on-interface</a>
<pre>XX</pre>
<a href="../src/test-cases/provides-on-union">provides-on-union</a>
<pre>..</pre>
<a href="../src/test-cases/requires-interface">requires-interface</a>
<pre>XXXXX</pre>
<a href="../src/test-cases/requires-requires">requires-requires</a>
<pre>XXX</pre>
<a href="../src/test-cases/requires-with-fragments">requires-with-fragments</a>
<pre>XXXXXX</pre>
<a href="../src/test-cases/shared-root">shared-root</a>
<pre>XX</pre>
<a href="../src/test-cases/simple-entity-call">simple-entity-call</a>
<pre>.</pre>
<a href="../src/test-cases/simple-inaccessible">simple-inaccessible</a>
<pre>..XX</pre>
<a href="../src/test-cases/simple-interface-object">simple-interface-object</a>
<pre>..X.XXX.XXXXX</pre>
<a href="../src/test-cases/simple-override">simple-override</a>
<pre>X.</pre>
<a href="../src/test-cases/simple-requires-provides">simple-requires-provides</a>
<pre>..........X</pre>
<a href="../src/test-cases/typename">typename</a>
<pre>......</pre>
<a href="../src/test-cases/unavailable-override">unavailable-override</a>
<pre>X.</pre>
<a href="../src/test-cases/union-interface-distributed">union-interface-distributed</a>
<pre>XX.....</pre>
<a href="../src/test-cases/union-intersection">union-intersection</a>
<pre>XXXXXXXX</pre>

</details>

