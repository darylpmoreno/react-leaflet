import {
  type EventedProps,
  type LeafletContextInterface,
  type LeafletElement,
  type SetOpenFunc,
  createOverlayComponent,
} from '@react-leaflet/core'
import {
  type LatLngExpression,
  Tooltip as LeafletTooltip,
  type TooltipEvent,
  type TooltipOptions,
} from 'leaflet'
import { type ReactNode, useEffect } from 'react'

export interface TooltipProps extends TooltipOptions, EventedProps {
  children?: ReactNode
  onClose?: () => void
  onOpen?: () => void
  position?: LatLngExpression
}

export const Tooltip = createOverlayComponent<LeafletTooltip, TooltipProps>(
  function createTooltip(props, context) {
    return {
      instance: new LeafletTooltip(props, context.overlayContainer),
      context,
    }
  },
  function useTooltipLifecycle(
    element: LeafletElement<LeafletTooltip>,
    context: LeafletContextInterface,
    props: TooltipProps,
    setOpen: SetOpenFunc,
  ) {
    const { onClose, onOpen } = props

    useEffect(
      function addTooltip() {
        const container = context.overlayContainer
        if (container == null) {
          return
        }

        const { instance } = element

        const onTooltipOpen = (event: TooltipEvent) => {
          if (event.tooltip === instance) {
            instance.update()
            setOpen(true)
            onOpen?.()
          }
        }

        const onTooltipClose = (event: TooltipEvent) => {
          if (event.tooltip === instance) {
            setOpen(false)
            onClose?.()
          }
        }

        container.on({
          tooltipopen: onTooltipOpen,
          tooltipclose: onTooltipClose,
        })
        container.bindTooltip(instance)

        return function removeTooltip() {
          container.off({
            tooltipopen: onTooltipOpen,
            tooltipclose: onTooltipClose,
          })
          // @ts-ignore protected property
          if (container._map != null) {
            container.unbindTooltip()
          }
        }
      },
      [element, context, setOpen, onClose, onOpen],
    )
  },
)
