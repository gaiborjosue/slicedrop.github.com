import React from 'react'
import { Niivue, NVImage } from '@niivue/niivue'
import { NiivuePanel } from './components/NiivuePanel.jsx'

const nv = new Niivue({
  loadingText: 'loading...'
})

export default function NiiVue(props) {
  const [layers, setLayers] = React.useState(nv.volumes)

  React.useEffect(() => {
    const loadVolumes = async () => {
      await nv.loadVolumes(props.volumes)
      setLayers([...nv.volumes])
    }
    loadVolumes()
  }, [props.volumes])

  nv.opts.onImageLoaded = () => {
    setLayers([...nv.volumes])
  }

  nv.opts.onLocationChange = (data) => {
    setLocationData(data.values)
  }

  return (
    <div>
      <NiivuePanel
        nv={nv}
        volumes={layers}
      >
      </NiivuePanel>
    </div>
  )
}
