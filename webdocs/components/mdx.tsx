import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from 'react' 
const admonition = require("@samrobbins/admonition-components")
const PreCopy = (props:any) => {
  const textInput = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const onEnter = () => {
    setHovered(true)
  }
  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }
  const onCopy = () => {
    setCopied(true)
    //@ts-ignore
    navigator.clipboard.writeText(textInput.current.innerText)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
  return (
    <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="relative">
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={`absolute right-2 top-2 w-8 h-8 p-1 rounded border-2 bg-gray-700 dark:bg-gray-800 ${
            copied
              ? 'focus:outline-none focus:border-green-400 border-green-400'
              : 'border-gray-300'
          }`}
          onClick={onCopy}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className={copied ? 'text-green-400' : 'text-gray-300'}
          >
            {copied ? (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </>
            ) : (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </>
            )}
          </svg>
        </button>
      )}
      <pre>{props.children}</pre>
    </div>
  )
}
const customLink = ({ href, ...rest }:any) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest} />
      </Link>
    )
  }
  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }
  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}
const mdxComponent = {
  ...admonition,
  a : customLink,
  pre : PreCopy
}
export default mdxComponent