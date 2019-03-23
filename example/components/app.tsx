import Leaflet from 'leaflet'
import React, { StrictMode } from 'react'

import SimpleExample from './simple'
import EventsExample from './events'
import ViewportExample from './viewport'
import VectorLayersExample from './vector-layers'
import OtherLayersExample from './other-layers'
import TooltipExample from './tooltip'
import ZoomControlExample from './zoom-control'
import LayersControlExample from './layers-control'
import PaneExample from './pane'
import DraggableExample from './draggable-marker'
import BoundsExample from './bounds'
import CustomComponentExample from './custom-component'
import AnimateExample from './animate'
import WMSTileLayerExample from './wms-tile-layer'
import VideoOverlayExample from './video-overlay'
import CustomIcons from './custom-icons'

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/images/'

export default function App() {
  return (
    <StrictMode>
      <h1>React-Leaflet examples</h1>
      <h2>Popup with Marker</h2>
      <SimpleExample />
      <h2>Events</h2>
      <p>Click the map to show a marker at your detected location</p>
      <EventsExample />
      <h2>Viewport</h2>
      <p>Click the map to reset it to its original position</p>
      <ViewportExample />
      <h2>Vector layers</h2>
      <VectorLayersExample />
      <h2>Other layers</h2>
      <OtherLayersExample />
      <h2>Tooltips</h2>
      <TooltipExample />
      <h2>Zoom control</h2>
      <ZoomControlExample />
      <h2>Layers control</h2>
      <LayersControlExample />
      <h2>Panes</h2>
      <PaneExample />
      <h2>Draggable Marker</h2>
      <DraggableExample />
      <h2>Map view by bounds</h2>
      <p>Click a rectangle to fit the map to its bounds</p>
      <BoundsExample />
      <h2>List of markers (custom component)</h2>
      <CustomComponentExample />
      <h2>Animate</h2>
      <p>Click the map to move to the location</p>
      <AnimateExample />
      <h2>WMS tile layer</h2>
      <WMSTileLayerExample />
      <h2>Video overlay</h2>
      <VideoOverlayExample />
      <h2>Custom Icons</h2>
      <CustomIcons />
    </StrictMode>
  )
}
