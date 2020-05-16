import React from 'react'
// 引入Redux相關
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchMuskmapdata } from '../action/muskmapaction'
// 引入地圖圖資
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

let mymap
class Map extends React.Component {
  componentDidMount() {
    this.props.fetchMuskmapdata()
    //import map
    mymap = L.map('mapid').setView([25.039969, 121.512548], 12)
    const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    L.tileLayer(OSMUrl).addTo(mymap)
  }
  componentDidUpdate() {
    const { features = [] } = this.props.muskmapdatas
    const allmuskmapdate = features
    // console.log(allmuskmapdate)
    const selectedtcity = this.props.passlocationdata.currentcity
    const selectedarea = this.props.passlocationareadata.currentarea
    // 更新地圖位置
    if (selectedtcity !== 'Nation') {
      const citymuskmapdata = allmuskmapdate.filter(
        (area) => area.properties.county === selectedtcity
      )
      if (selectedarea !== 'Unset') {
        const cityareamuskmapdata = citymuskmapdata.filter(
          (area) => area.properties.town === selectedarea
        )
        const cityareaLatitude = cityareamuskmapdata[0].geometry.coordinates[1]
        const cityareaLongitude = cityareamuskmapdata[0].geometry.coordinates[0]
        mymap.flyTo([cityareaLatitude, cityareaLongitude], 15, {
          animate: false,
        })
        // mymap.zoomIn(2)
      } else {
        const cityLatitude = citymuskmapdata[0].geometry.coordinates[1]
        const cityLongitude = citymuskmapdata[0].geometry.coordinates[0]
        mymap.flyTo([cityLatitude, cityLongitude], 12, { animate: false })
      }
    }
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
  return {
    muskmapdatas: store.muskmapreducer.muskmapdata,
    passlocationdata: store.muskmapreducer.passlocationdata,
    passlocationareadata: store.muskmapreducer.passlocationareadata,
  }
}

// 指示dispatch要綁定哪些action creators
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchMuskmapdata }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
