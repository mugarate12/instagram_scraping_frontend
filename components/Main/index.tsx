interface Props {
  className?: string;
  children?: React.ReactNode;
}

/**
 * @description by default main html element is display: flex
 * @description by default main html element is align items in center (x axis)
 */
const Main = ({ className, children }: Props) => {
  return (
    <main className={`h-[calc(100vh-5rem)] flex flex-col items-center ${className}`}>
      {children}
    </main>
  )
}

export default Main
