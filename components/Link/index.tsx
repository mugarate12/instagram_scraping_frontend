import Link from 'next/link'

interface Props {
  href?: string;
  target?: string;
  children?: React.ReactNode;
}

const LinkComponent = ({ href, target, children }: Props) => {
  return (
    <Link href={!!href ? href : ''}>
      <a target={target}>
        {children}
      </a>
    </Link>
  )
}

export default LinkComponent;