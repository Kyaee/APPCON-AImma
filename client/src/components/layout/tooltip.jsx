import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const Tooltip = forwardRef(({name, description, className}, ref) => (
    <span class={`${className} absolute bottom-[125%] left-1/2 -translate-x-1/2 w-[120px] bg-gray-700 text-white text-center p-1.5 rounded-md opacity-0 invisible transition-opacity duration-300`}>
      {name}
      <p class="text-xs text-slate-400 font-normal">{description}</p>
      <span class="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-solid border-t-gray-700 border-r-transparent border-b-transparent border-l-transparent"></span>
    </span>
))
Tooltip.displayName = "Tooltip"

export { Tooltip }