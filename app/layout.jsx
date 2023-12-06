import '@styles/globals.css';
import Nav from '@components/Nav';
import provider from '@components/provider';
export const metaData = {
    title : "PromptAdda" ,
    description : "discover AI prompts"
}
const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <div className='main'>
                <div className='gradient'></div>
            </div>
            
            <main className='app'>
            <Nav/>
              {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout