import React from 'react'

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchMuskmapdata } from '../action/muskmapaction'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

let mymap
class Map extends React.Component {
  componentDidMount() {
    this.props.fetchMuskmapdata()
    console.log(this.props)
  }
  componentDidUpdate(prevProps) {
    if (this.props.muskmapdata !== prevProps.muskmapdata) {
      mymap = L.map('mapid').setView([25.033158, 121.564532], 15)
      const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

      L.tileLayer(OSMUrl).addTo(mymap)
      const marksinfo = this.props.muskmapdata
      console.log(marksinfo)
    }
  }
  render() {
    return (
      <>
        <div id="mapid" className="muskmap"></div>
      </>
    )
  }
}
// 取得Redux中store的值
const mapStateToProps = (store) => {
  return { muskmapdatas: store.muskmapreducer.muskmapdata }
}

// 指示dispatch要綁定哪些action creators
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchMuskmapdata }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map))
