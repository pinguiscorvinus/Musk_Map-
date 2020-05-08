import React from 'react'

import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchMuskmapdata } from '../action/muskmapaction'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

let mymap
class Map extends React.Component {
  componentDidMount() {
    this.props.fetchMuskmapdata()
  }
  componentDidUpdate(prevProps) {
    if (this.props.muskmapdatas !== prevProps.muskmapdatas) {
      const allmuskmapdate = this.props.muskmapdatas.features
      console.log(allmuskmapdate)
      //import map
      mymap = L.map('mapid').setView([25.033158, 121.564532], 15)
      const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      L.tileLayer(OSMUrl).addTo(mymap)
      // import markerClusterGroup
      const markers = L.markerClusterGroup().addTo(mymap)
      // seticon
      const blueIcon = new L.Icon({
        iconUrl:
          'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })
      // 取得座標資料
      for (let i = 0; i < allmuskmapdate.length - 1; i++) {
        let Latitude = allmuskmapdate[i].geometry.coordinates[1]
        let Longitude = allmuskmapdate[i].geometry.coordinates[0]
        markers.addLayer(
          L.marker([Latitude, Longitude], { icon: blueIcon }).bindPopup(
            `<div class="card muskdatapopup" style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">${allmuskmapdate[i].properties.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${allmuskmapdate[i].properties.address}</h6>
                <h6 class="card-subtitle mb-2 text-muted">${allmuskmapdate[i].properties.phone}</h6>
                <table class="table">
                    <tr>
                      <td>成人口罩還有</td>
                      <td>${allmuskmapdate[i].properties.mask_adult} 個</td>
                    </tr>
                    <tr>
                      <td>兒童口罩還有</td>
                      <td>${allmuskmapdate[i].properties.mask_child} 個</td>
                    </tr>
                </table>
                <p class="card-text">藥局備註：${allmuskmapdate[i].properties.note}</p>
              </div>
            </div>`
          )
        )
      }
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
