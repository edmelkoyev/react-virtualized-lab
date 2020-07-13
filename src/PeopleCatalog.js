import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List
} from 'react-virtualized'

let rCount = 0

class PeopleCatalog extends PureComponent {
  constructor(props){
    super(props)

    this.renderRow = this.renderRow.bind(this)
    this.setListRef = this.setListRef.bind(this)

    this.ListRef = undefined
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100
    })
  }

  componentDidUpdate (){
    this.cache.clearAll()
    this.ListRef.forceUpdateGrid()
    // this.ListRef.recomputeRowHeights()
  }

  setListRef (ListRef) {
    this.ListRef = ListRef
  }


  renderRow ({key, index, style, parent}) {
    const user = this.props.users[index]

    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>
          <h3>{`${user.id}. ${user.name}`}</h3>
          <p>{user.bio}</p>
        </div>
      </CellMeasurer>
    )
  }

  render () {
    const { users } = this.props
    rCount = rCount+1
    console.log(`xxx: Render ${rCount}`)

    return (
      <div style={{padding: '1rem'}}>
        <h2>People Catalog</h2>

        <div style={{width: '100%', height: '100vh'}}>
          <AutoSizer>
            {({width, height}) => (
              <List
                width={width}
                height={height}
                rowHeight={this.cache.rowHeight}
                deferredMeasurementCache={this.cache}
                rowCount={users.length}
                rowRenderer={this.renderRow}
                ref={this.setListRef}
              />
            )}
          </AutoSizer>
        </div>
      </div>)
  }
}

PeopleCatalog.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired
        })
    )
}

export default PeopleCatalog
