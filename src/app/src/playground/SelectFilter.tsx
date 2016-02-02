import * as React from "react";

import {
  SearchkitComponent,
  FacetAccessor
} from "searchkit"

const CustomSelect = require('react-select-box');
require('./SelectFilter.css')

export default class SelectFilter extends SearchkitComponent<any, any> {
  accessor: FacetAccessor

  defaultProps={
    size: 50
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

  handleChange(event) {
    this.accessor.state = this.accessor.state.setValue(event.slice());
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
    let isAllChecked = () => {
      return !this.accessor.state.getValue() || this.accessor.state.getValue().length == 0
    }

    return (
      <div className={className}>
        <div className={block("header") }>{this.props.title}</div>
        <CustomSelect
          className={block("options") }
          label={this.props.label}
          value={this.accessor.state.getValue() }
          onChange={this.handleChange.bind(this) }
          multiple={true}>
          {/* this.renderOption("All", null, isAllChecked()) */}
          {_.map(this.accessor.getBuckets(), this.createOption.bind(this)) }
          </CustomSelect>
        </div>
    );
  }
}
