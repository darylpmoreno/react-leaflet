import {
  CONTEXT_VERSION,
  LeafletProvider,
  type LeafletContextInterface,
} from '@react-leaflet/core'
import {
  type FitBoundsOptions,
  type LatLngBoundsExpression,
  Map as LeafletMap,
  type MapOptions,
} from 'leaflet'
import React, {
  type CSSProperties,
  type ReactNode,
  type Ref,
  forwardRef,
  useCallback,
  useState,
} from 'react'

export interface MapContainerProps extends MapOptions {
  bounds?: LatLngBoundsExpression
  boundsOptions?: FitBoundsOptions
  children?: ReactNode
  className?: string
  id?: string
  placeholder?: ReactNode
  style?: CSSProperties
  whenReady?: () => void
}

function MapContainerComponent<
  Props extends MapContainerProps = MapContainerProps,
>(
  {
    bounds,
    boundsOptions,
    center,
    children,
    className,
    id,
    placeholder,
    style,
    whenReady,
    zoom,
    ...options
  }: Props,
  forwardedRef: Ref<LeafletMap>,
) {
  const [props] = useState({ className, id, style })

  const [context, setContext] = useState<LeafletContextInterface | null>(null)

  const mapRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null && context === null) {
      const map = new LeafletMap(node, options)
      if (center != null && zoom != null) {
        map.setView(center, zoom)
      } else if (bounds != null) {
        map.fitBounds(bounds, boundsOptions)
      }
      if (whenReady != null) {
        map.whenReady(whenReady)
      }

      setContext({ __version: CONTEXT_VERSION, map })
      if (forwardedRef != null) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(map)
        } else {
          // @ts-ignore assignment
          forwardedRef.current = map
        }
      }
    }
  }, [])

  const contents = context ? (
    <LeafletProvider value={context}>{children}</LeafletProvider>
  ) : (
    placeholder ?? null
  )
  return (
    <div {...props} ref={mapRef}>
      {contents}
    </div>
  )
}

export const MapContainer = forwardRef(MapContainerComponent)
