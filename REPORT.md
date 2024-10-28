# Compatibility Results

## Summary

|                      Gateway                       | Compatibility |  Test Cases  | Test Suites |
| :------------------------------------------------: | :-----------: | :----------: | :---------: |
| [Hive Gateway](https://the-guild.dev/graphql/hive) |    100.00%    |    🟢 171    |    🟢 41    |
|  [Apollo Router](https://www.apollographql.com/)   |    97.66%     | 🟢 167 ❌ 4  | 🟢 39 ❌ 2  |
|  [Apollo Gateway](https://www.apollographql.com/)  |    97.08%     | 🟢 166 ❌ 5  | 🟢 38 ❌ 3  |
|      [Cosmo Router](https://wundergraph.com)       |    72.51%     | 🟢 124 ❌ 47 | 🟢 19 ❌ 22 |
|      [Grafbase Gateway](https://grafbase.com)      |    60.23%     | 🟢 103 ❌ 68 | 🟢 19 ❌ 22 |

## Detailed Results

Take a closer look at the results for each gateway.

You can look at the full list of tests [here](./src/test-suites/). Every test id corresponds to a directory in the `src/test-suites` folder.

<a id="hive-gateway"></a>

### Hive Gateway

- [Repository](https://github.com/Urigo/graphql-mesh)
- [Website](https://the-guild.dev/graphql/hive)

<details>
<summary>Results</summary>
<a href="./src/test-suites/abstract-types">abstract-types</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/child-type-mismatch">child-type-mismatch</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/circular-reference-interface">circular-reference-interface</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/complex-entity-call">complex-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/corrupted-supergraph-node-id">corrupted-supergraph-node-id</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/enum-intersection">enum-intersection</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/fed1-external-extends">fed1-external-extends</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed1-external-extends-resolvable">fed1-external-extends-resolvable</a>
<pre>🟢</pre>
<a href="./src/test-suites/fed1-external-extension">fed1-external-extension</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed2-external-extends">fed2-external-extends</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed2-external-extension">fed2-external-extension</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/include-skip">include-skip</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/input-object-intersection">input-object-intersection</a>
<pre>🟢🟢🟢</pre>
<a href="./src/test-suites/interface-object-with-requires">interface-object-with-requires</a>
<pre>🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/keys-mashup">keys-mashup</a>
<pre>🟢</pre>
<a href="./src/test-suites/mutations">mutations</a>
<pre>🟢🟢🟢</pre>
<a href="./src/test-suites/mysterious-external">mysterious-external</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/nested-provides">nested-provides</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/node">node</a>
<pre>🟢</pre>
<a href="./src/test-suites/non-resolvable-interface-object">non-resolvable-interface-object</a>
<pre>🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/null-keys">null-keys</a>
<pre>🟢</pre>
<a href="./src/test-suites/override-type-interface">override-type-interface</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/override-with-requires">override-with-requires</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/parent-entity-call">parent-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/parent-entity-call-complex">parent-entity-call-complex</a>
<pre>🟢</pre>
<a href="./src/test-suites/provides-on-interface">provides-on-interface</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/provides-on-union">provides-on-union</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/requires-interface">requires-interface</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/requires-requires">requires-requires</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/requires-with-argument">requires-with-argument</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/requires-with-fragments">requires-with-fragments</a>
<pre>🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/shared-root">shared-root</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/simple-entity-call">simple-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/simple-inaccessible">simple-inaccessible</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/simple-interface-object">simple-interface-object</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/simple-override">simple-override</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/simple-requires-provides">simple-requires-provides</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/typename">typename</a>
<pre>🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/unavailable-override">unavailable-override</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/union-interface-distributed">union-interface-distributed</a>
<pre>🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/union-intersection">union-intersection</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢</pre>
</details>

<a id="apollo-router"></a>

### Apollo Router

- [Repository](https://github.com/apollographql/router)
- [Website](https://www.apollographql.com/)

<details>
<summary>Results</summary>
<a href="./src/test-suites/abstract-types">abstract-types</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/child-type-mismatch">child-type-mismatch</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/circular-reference-interface">circular-reference-interface</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/complex-entity-call">complex-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/corrupted-supergraph-node-id">corrupted-supergraph-node-id</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/enum-intersection">enum-intersection</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/fed1-external-extends">fed1-external-extends</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed1-external-extends-resolvable">fed1-external-extends-resolvable</a>
<pre>🟢</pre>
<a href="./src/test-suites/fed1-external-extension">fed1-external-extension</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed2-external-extends">fed2-external-extends</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed2-external-extension">fed2-external-extension</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/include-skip">include-skip</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/input-object-intersection">input-object-intersection</a>
<pre>🟢🟢🟢</pre>
<a href="./src/test-suites/interface-object-with-requires">interface-object-with-requires</a>
<pre>🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/keys-mashup">keys-mashup</a>
<pre>❌</pre>
<a href="./src/test-suites/mutations">mutations</a>
<pre>🟢🟢🟢</pre>
<a href="./src/test-suites/mysterious-external">mysterious-external</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/nested-provides">nested-provides</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/node">node</a>
<pre>🟢</pre>
<a href="./src/test-suites/non-resolvable-interface-object">non-resolvable-interface-object</a>
<pre>🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/null-keys">null-keys</a>
<pre>🟢</pre>
<a href="./src/test-suites/override-type-interface">override-type-interface</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/override-with-requires">override-with-requires</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/parent-entity-call">parent-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/parent-entity-call-complex">parent-entity-call-complex</a>
<pre>🟢</pre>
<a href="./src/test-suites/provides-on-interface">provides-on-interface</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/provides-on-union">provides-on-union</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/requires-interface">requires-interface</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/requires-requires">requires-requires</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/requires-with-argument">requires-with-argument</a>
<pre>🟢🟢❌❌❌</pre>
<a href="./src/test-suites/requires-with-fragments">requires-with-fragments</a>
<pre>🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/shared-root">shared-root</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/simple-entity-call">simple-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/simple-inaccessible">simple-inaccessible</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/simple-interface-object">simple-interface-object</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/simple-override">simple-override</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/simple-requires-provides">simple-requires-provides</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/typename">typename</a>
<pre>🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/unavailable-override">unavailable-override</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/union-interface-distributed">union-interface-distributed</a>
<pre>🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/union-intersection">union-intersection</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢</pre>
</details>

<a id="apollo-gateway"></a>

### Apollo Gateway

- [Repository](https://github.com/apollographql/federation)
- [Website](https://www.apollographql.com/)

<details>
<summary>Results</summary>
<a href="./src/test-suites/abstract-types">abstract-types</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/child-type-mismatch">child-type-mismatch</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/circular-reference-interface">circular-reference-interface</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/complex-entity-call">complex-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/corrupted-supergraph-node-id">corrupted-supergraph-node-id</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/enum-intersection">enum-intersection</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/fed1-external-extends">fed1-external-extends</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed1-external-extends-resolvable">fed1-external-extends-resolvable</a>
<pre>🟢</pre>
<a href="./src/test-suites/fed1-external-extension">fed1-external-extension</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed2-external-extends">fed2-external-extends</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed2-external-extension">fed2-external-extension</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/include-skip">include-skip</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/input-object-intersection">input-object-intersection</a>
<pre>🟢🟢🟢</pre>
<a href="./src/test-suites/interface-object-with-requires">interface-object-with-requires</a>
<pre>🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/keys-mashup">keys-mashup</a>
<pre>❌</pre>
<a href="./src/test-suites/mutations">mutations</a>
<pre>🟢🟢🟢</pre>
<a href="./src/test-suites/mysterious-external">mysterious-external</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/nested-provides">nested-provides</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/node">node</a>
<pre>🟢</pre>
<a href="./src/test-suites/non-resolvable-interface-object">non-resolvable-interface-object</a>
<pre>🟢❌🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/null-keys">null-keys</a>
<pre>🟢</pre>
<a href="./src/test-suites/override-type-interface">override-type-interface</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/override-with-requires">override-with-requires</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/parent-entity-call">parent-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/parent-entity-call-complex">parent-entity-call-complex</a>
<pre>🟢</pre>
<a href="./src/test-suites/provides-on-interface">provides-on-interface</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/provides-on-union">provides-on-union</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/requires-interface">requires-interface</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/requires-requires">requires-requires</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/requires-with-argument">requires-with-argument</a>
<pre>🟢🟢❌❌❌</pre>
<a href="./src/test-suites/requires-with-fragments">requires-with-fragments</a>
<pre>🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/shared-root">shared-root</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/simple-entity-call">simple-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/simple-inaccessible">simple-inaccessible</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/simple-interface-object">simple-interface-object</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/simple-override">simple-override</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/simple-requires-provides">simple-requires-provides</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/typename">typename</a>
<pre>🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/unavailable-override">unavailable-override</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/union-interface-distributed">union-interface-distributed</a>
<pre>🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/union-intersection">union-intersection</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢</pre>
</details>

<a id="cosmo-router"></a>

### Cosmo Router

- [Repository](https://github.com/wundergraph/cosmo)
- [Website](https://wundergraph.com)

<details>
<summary>Results</summary>
<a href="./src/test-suites/abstract-types">abstract-types</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/child-type-mismatch">child-type-mismatch</a>
<pre>❌❌❌🟢</pre>
<a href="./src/test-suites/circular-reference-interface">circular-reference-interface</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/complex-entity-call">complex-entity-call</a>
<pre>❌</pre>
<a href="./src/test-suites/corrupted-supergraph-node-id">corrupted-supergraph-node-id</a>
<pre>❌🟢🟢🟢🟢❌🟢🟢🟢🟢</pre>
<a href="./src/test-suites/enum-intersection">enum-intersection</a>
<pre>🟢🟢❌🟢🟢</pre>
<a href="./src/test-suites/fed1-external-extends">fed1-external-extends</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed1-external-extends-resolvable">fed1-external-extends-resolvable</a>
<pre>❌</pre>
<a href="./src/test-suites/fed1-external-extension">fed1-external-extension</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed2-external-extends">fed2-external-extends</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed2-external-extension">fed2-external-extension</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/include-skip">include-skip</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/input-object-intersection">input-object-intersection</a>
<pre>🟢🟢🟢</pre>
<a href="./src/test-suites/interface-object-with-requires">interface-object-with-requires</a>
<pre>❌❌🟢🟢❌❌❌</pre>
<a href="./src/test-suites/keys-mashup">keys-mashup</a>
<pre>🟢</pre>
<a href="./src/test-suites/mutations">mutations</a>
<pre>🟢🟢❌</pre>
<a href="./src/test-suites/mysterious-external">mysterious-external</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/nested-provides">nested-provides</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/node">node</a>
<pre>🟢</pre>
<a href="./src/test-suites/non-resolvable-interface-object">non-resolvable-interface-object</a>
<pre>🟢🟢🟢🟢❌🟢❌</pre>
<a href="./src/test-suites/null-keys">null-keys</a>
<pre>❌</pre>
<a href="./src/test-suites/override-type-interface">override-type-interface</a>
<pre>🟢❌🟢🟢</pre>
<a href="./src/test-suites/override-with-requires">override-with-requires</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/parent-entity-call">parent-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/parent-entity-call-complex">parent-entity-call-complex</a>
<pre>❌</pre>
<a href="./src/test-suites/provides-on-interface">provides-on-interface</a>
<pre>❌❌</pre>
<a href="./src/test-suites/provides-on-union">provides-on-union</a>
<pre>❌❌</pre>
<a href="./src/test-suites/requires-interface">requires-interface</a>
<pre>🟢🟢❌🟢🟢</pre>
<a href="./src/test-suites/requires-requires">requires-requires</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/requires-with-argument">requires-with-argument</a>
<pre>❌❌❌❌❌</pre>
<a href="./src/test-suites/requires-with-fragments">requires-with-fragments</a>
<pre>❌❌❌❌❌❌</pre>
<a href="./src/test-suites/shared-root">shared-root</a>
<pre>🟢❌</pre>
<a href="./src/test-suites/simple-entity-call">simple-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/simple-inaccessible">simple-inaccessible</a>
<pre>🟢🟢🟢❌</pre>
<a href="./src/test-suites/simple-interface-object">simple-interface-object</a>
<pre>🟢🟢🟢🟢🟢🟢🟢❌❌🟢❌❌❌</pre>
<a href="./src/test-suites/simple-override">simple-override</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/simple-requires-provides">simple-requires-provides</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/typename">typename</a>
<pre>🟢🟢🟢🟢❌🟢</pre>
<a href="./src/test-suites/unavailable-override">unavailable-override</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/union-interface-distributed">union-interface-distributed</a>
<pre>❌🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/union-intersection">union-intersection</a>
<pre>🟢🟢🟢❌❌🟢🟢❌</pre>
</details>

<a id="grafbase-gateway"></a>

### Grafbase Gateway

- [Repository](https://github.com/grafbase/grafbase)
- [Website](https://grafbase.com)

<details>
<summary>Results</summary>
<a href="./src/test-suites/abstract-types">abstract-types</a>
<pre>🟢🟢🟢🟢❌🟢🟢🟢❌🟢❌❌🟢🟢❌❌❌</pre>
<a href="./src/test-suites/child-type-mismatch">child-type-mismatch</a>
<pre>❌❌❌🟢</pre>
<a href="./src/test-suites/circular-reference-interface">circular-reference-interface</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/complex-entity-call">complex-entity-call</a>
<pre>❌</pre>
<a href="./src/test-suites/corrupted-supergraph-node-id">corrupted-supergraph-node-id</a>
<pre>❌🟢❌🟢🟢❌🟢🟢🟢🟢</pre>
<a href="./src/test-suites/enum-intersection">enum-intersection</a>
<pre>🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/fed1-external-extends">fed1-external-extends</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed1-external-extends-resolvable">fed1-external-extends-resolvable</a>
<pre>❌</pre>
<a href="./src/test-suites/fed1-external-extension">fed1-external-extension</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed2-external-extends">fed2-external-extends</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/fed2-external-extension">fed2-external-extension</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/include-skip">include-skip</a>
<pre>❌❌❌❌</pre>
<a href="./src/test-suites/input-object-intersection">input-object-intersection</a>
<pre>🟢🟢🟢</pre>
<a href="./src/test-suites/interface-object-with-requires">interface-object-with-requires</a>
<pre>🟢🟢❌🟢❌❌❌</pre>
<a href="./src/test-suites/keys-mashup">keys-mashup</a>
<pre>🟢</pre>
<a href="./src/test-suites/mutations">mutations</a>
<pre>🟢🟢🟢</pre>
<a href="./src/test-suites/mysterious-external">mysterious-external</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/nested-provides">nested-provides</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/node">node</a>
<pre>🟢</pre>
<a href="./src/test-suites/non-resolvable-interface-object">non-resolvable-interface-object</a>
<pre>❌🟢❌🟢🟢🟢❌</pre>
<a href="./src/test-suites/null-keys">null-keys</a>
<pre>❌</pre>
<a href="./src/test-suites/override-type-interface">override-type-interface</a>
<pre>❌❌🟢🟢</pre>
<a href="./src/test-suites/override-with-requires">override-with-requires</a>
<pre>🟢❌❌❌</pre>
<a href="./src/test-suites/parent-entity-call">parent-entity-call</a>
<pre>❌</pre>
<a href="./src/test-suites/parent-entity-call-complex">parent-entity-call-complex</a>
<pre>❌</pre>
<a href="./src/test-suites/provides-on-interface">provides-on-interface</a>
<pre>🟢❌</pre>
<a href="./src/test-suites/provides-on-union">provides-on-union</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/requires-interface">requires-interface</a>
<pre>❌🟢❌🟢🟢</pre>
<a href="./src/test-suites/requires-requires">requires-requires</a>
<pre>❌❌❌❌❌</pre>
<a href="./src/test-suites/requires-with-argument">requires-with-argument</a>
<pre>🟢❌❌❌❌</pre>
<a href="./src/test-suites/requires-with-fragments">requires-with-fragments</a>
<pre>❌❌❌❌❌🟢</pre>
<a href="./src/test-suites/shared-root">shared-root</a>
<pre>❌❌</pre>
<a href="./src/test-suites/simple-entity-call">simple-entity-call</a>
<pre>🟢</pre>
<a href="./src/test-suites/simple-inaccessible">simple-inaccessible</a>
<pre>🟢🟢🟢🟢</pre>
<a href="./src/test-suites/simple-interface-object">simple-interface-object</a>
<pre>🟢🟢❌🟢❌❌❌🟢❌❌❌❌❌</pre>
<a href="./src/test-suites/simple-override">simple-override</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/simple-requires-provides">simple-requires-provides</a>
<pre>🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢❌❌</pre>
<a href="./src/test-suites/typename">typename</a>
<pre>🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/unavailable-override">unavailable-override</a>
<pre>🟢🟢</pre>
<a href="./src/test-suites/union-interface-distributed">union-interface-distributed</a>
<pre>🟢🟢🟢🟢🟢🟢🟢</pre>
<a href="./src/test-suites/union-intersection">union-intersection</a>
<pre>❌🟢🟢❌❌🟢🟢❌</pre>
</details>
