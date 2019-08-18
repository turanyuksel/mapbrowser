import React from 'react';
import PropTypes from 'prop-types';
import { SearchBox, CommandBar, List } from 'office-ui-fabric-react';
import { searchByName } from '../../model/searchDao';
import { styles, classNames } from './listStyle';

const MAX_ROWS = 20;

class SearchPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /* The text on the search box */
            queryText: '',
            /* Starting result index*/
            resultsStart: 0,
            /* Number of results, 0 means query returned nothing */
            resultsCount: null,
            /* TODO: put a spinner in an overlay */
            searching: false,
            canGoBack: false,
            canGoForward: true,
        }
        this.clearSearchBox = this.clearSearchBox.bind(this);
        this.searchTextChange = this.searchTextChange.bind(this);
        this.startSearch = this.startSearch.bind(this);
        this.renderSingleResult = this.renderSingleResult.bind(this);
    }
    startSearch() {
        this.setState({ resultsStart: 0, canGoBack: false });
        this.retrieveResults();
    }
    retrieveResults() {
        if (this.state.searching) return;
        this.searching = true;
        let me = this;
        searchByName(this.state.queryText, this.state.resultsStart).then(response => {
            me.setState({
                canGoBack: this.state.resultsStart > 0,
                canGoForward: this.state.resultsStart + MAX_ROWS < response.totalCount,
                resultsCount: response.totalCount,
                resultsToDisplay: response.results,
            });
            me.props.onSearchComplete(response.results);
        }).finally(() => {
            me.setState({ searching: false });
        });
    }
    clearSearchBox() {
        this.setState({ queryText: '' });
    }
    searchTextChange(e) {
        if (!e) return;
        this.setState({ queryText: e.target.value });
    }
    back() {
        this.setState({
            resultsStart: this.state.resultsStart - MAX_ROWS
        })
        this.retrieveResults();
    }
    forward() {
        this.setState({
            resultsStart: this.state.resultsStart + MAX_ROWS
        });
        this.retrieveResults();
    }
    renderSingleResult(item) {
        return <div className={classNames.list.itemCell}>
            <div className={classNames.list.itemContent}>
                <div className={classNames.list.itemName} onClick={()=>this.props.onSelectItem(item)}>{item.name}</div>
                <div>Population:{item.population}, Country:{item.country}</div>
            </div>
        </div>;
    }
    render() {
        const hasItems = this.props.resultsToDisplay.length > 0;
        const searchResultBar = [
            {
                key: 'back',
                name: 'Back',
                iconProps: { iconName: 'Back' },
                onClick: () => this.back(),
                disabled: !this.state.canGoBack
            },
            {
                key: 'forward',
                name: 'Forward',
                iconProps: { iconName: 'Forward' },
                onClick: () => this.forward(),
                disabled: !this.state.canGoForward
            }
        ];
        return <div>
            <div style={styles.searchBox}>
                <SearchBox placeholder="Search a place name" onChange={this.searchTextChange} onSearch={this.startSearch} onEscape={this.clearSearchBox} width={300} />
            </div>
            {
                hasItems && <div style={styles.searchResultBox}>
                    <CommandBar items={searchResultBar} />
                </div>
            }
            {hasItems && <div style={styles.searchItemsBox}>
                <List items={this.props.resultsToDisplay} onRenderCell={this.renderSingleResult} />
            </div>}
        </div>;
    }
}
SearchPanel.propTypes = {
    /* The results to display in the items list */
    resultsToDisplay: PropTypes.array.isRequired,
    /* What else to do when a search is completed successfully */
    onSearchComplete: PropTypes.func.isRequired,
    /* What else to do when an item is selected */
    onSelectItem: PropTypes.func
}
export default SearchPanel;