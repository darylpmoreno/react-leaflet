import React from "react";
import Leaflet from "leaflet";

import latlngListType from "./types/latlngList";
import popupContainerMixin from "./mixins/popupContainer";

export default React.createClass({
  displayName: "Polyline",

  mixins: [popupContainerMixin],

  propTypes: {
    positions: latlngListType.isRequired
  },

  componentWillMount() {
    let {map, positions, ...props} = this.props;
    this._leafletElement = Leaflet.polyline(positions, props);
  },

  componentDidUpdate(prevProps) {
    if (this.props.positions !== prevProps.positions) {
      this.getLeafletElement().setLatLngs(this.props.positions);
    }
  }
});
