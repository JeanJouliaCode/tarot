import "styles/Text.scss"

interface TextProps {
  content: string;
}

export default function Text({content}:TextProps){
  return (
    <span className="text">{content}</span>
  )
}