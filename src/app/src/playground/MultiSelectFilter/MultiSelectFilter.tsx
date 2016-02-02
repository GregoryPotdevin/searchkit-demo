import * as React from "react";

import {
  SearchkitComponent,
  FacetAccessor
} from "searchkit"

const Select = require('react-select');
require('./MultiSelectFilter.css')
const _ = require('lodash');


export default class MultiSelectFilter extends SearchkitComponent<any, any> {
  accessor: FacetAccessor

  defaultProps={
    size: 200
  }

  defineAccessor() {
    const { field, id, operator, title, size, translations } = this.props;
    return new FacetAccessor(field, {
      id, operator, title, size, translations
    })
  }

  defineBEMBlocks() {
    var blockName = this.props.mod || "refinement-list"
    return {
      container: blockName,
      option: `${blockName}-option`
    }
  }

  handleChange(value, selectedOptions) {
    this.accessor.state = this.accessor.state.setValue(selectedOptions.map(o => o.value));
    this.searchkit.performSearch();
  }

  createOption(option) {
    var isChecked = this.accessor.state.contains(option.key)
    var count = option.doc_count
    var label = this.translate(option.key)
    return this.renderOption(label, count, isChecked);
  }

  renderOption(label, count, isChecked) {

    let key = label;
    var className = this.bemBlocks.option()
      .state({ selected: isChecked })
      .mix(this.bemBlocks.container("item"))

    return (
      <option className={className} value={label} key={key}>
        {label} {count ? '(' + count + ')' : null}
      </option>
    )
  }

  render() {
    var block = this.bemBlocks.container
    var className = block().mix(`filter--${this.props.id}`)
    const buckets = this.accessor.getBuckets().slice()
    _.sortBy(buckets, 'key')

    const options = buckets.map((v) => ({ value: v.key, label: v.key + ' (' + v.doc_count + ') '}))
    return (
      <div className={className}>
        <div className={block("header") }>{this.props.title}</div>

        <Select multi simpleValue disabled={false} value={this.accessor.state.getValue()}
                placeholder="Select your favourite(s)"
                options={options}
                onChange={this.handleChange.bind(this)} />


        </div>
    );
  }
}
