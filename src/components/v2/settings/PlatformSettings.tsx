import { For, createSignal } from 'solid-js'
import SettingsUIComponent from './SettingsUIComponent'
import type { SettingsUI } from '@/types/provider'

interface Props {
  config: {
    id: string
    icon?: string
    name: string
    settings?: SettingsUI[]
  }
}

export default ({ config }: Props) => {
  const [editing, setEditing] = createSignal(false)

  const handleClick = () => {
    console.log('click')
    setEditing(false)
  }

  if (!config.settings) return null
  return (
    <div
      class="px-4 py-3 border transition-colors"
      classList={{
        'border border-amber/40 bg-amber/2': editing(),
        'border border-b-base border-l-transparent border-r-transparent border-t-transparent': !editing(),
      }}
    >
      <h3 class="fi gap-2">
        <div class="flex-1 fi gap-1.5 overflow-hidden">
          {config.icon && <div class={config.icon} />}
          <div class="flex-1 text-sm truncate">{config.name}</div>
        </div>
        {!editing() && (
          <div onClick={() => setEditing(true)} class="p-1 inline-flex items-center rounded-md hv-base hv-foreground">
            <div class="i-carbon-edit" />
          </div>
        )}
        {editing() && (
          <>
            <div onClick={() => setEditing(false)} class="p-1 inline-flex items-center rounded-md hv-base hv-foreground">
              <div class="i-carbon-close" />
            </div>
            <div onClick={handleClick} class="p-1 inline-flex items-center rounded-md hv-base hv-foreground">
              <div class="i-carbon-checkmark" />
            </div>
          </>
        )}
      </h3>
      <div class="mt-2 flex flex-col">
        <For each={config.settings}>
          {item => (
            <SettingsUIComponent settings={item} editing={editing} />
          )}
        </For>
      </div>
    </div>
  )
}