import * as React from "react";
import {
  SearchBox,
  Hits,
  HierarchicalRefinementFilter,
  Pagination,
  ResetFilters,
  SelectedFilters,
  SearchkitComponent,
  HitsStats,
  SearchkitManager,
  SearchkitProvider
} from "searchkit";

require("./../styles/index.scss");

class TaxonomyHits extends Hits {
  renderResult(result:any) {
    return (
      <div className={this.bemBlocks.item().mix(this.bemBlocks.container("item"))} key={result._id}>
        {result._source.name}
      </div>
    )
  }
}

export class TaxonomyApp extends React.Component<any, any> {

  sk:SearchkitManager

  constructor() {
    const host = "https://d78cfb11f565e845000.qb0x.com/taxonomynested"
    this.sk = new SearchkitManager(host, {
      multipleSearchers:false
    })
    super()
  }

  render(){ return (
    <div>
    <SearchkitProvider searchkit={this.sk}>
    <div className="layout">
      <div className="layout__search-box">
        <SelectedFilters/>
        <SearchBox autofocus={true} queryFields={["actors^1","type^2","languages","title^5", "genres^2"]}/>
      </div>

			<div className="layout__filters">
				<ResetFilters />
        <HierarchicalRefinementFilter field="taxonomy" id="categories" title="Region" startLevel={2}/>
			</div>
			<div className="layout__results-info">
				<HitsStats/>
			</div>
			<div className="layout__results">
				<TaxonomyHits hitsPerPage={10}/>
				<Pagination/>
			</div>
			<a className="view-src-link" href="https://github.com/searchkit/searchkit-demo/blob/master/src/app/src/App.tsx">View source »</a>
		</div>
    </SearchkitProvider>
    </div>
	)}

}
