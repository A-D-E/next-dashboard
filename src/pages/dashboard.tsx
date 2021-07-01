import Layout from 'Layouts'
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl'
import Head from 'next/head'

const Home = () => {
  const intl = useIntl()

  return (
    <Layout
      title={intl.formatMessage({
        defaultMessage: 'Home',
      })}
    >
      <Head>
        <meta
          name="description"
          content={intl.formatMessage({
            defaultMessage: 'An example app integrating React Intl with Next.js',
          })}
        />
      </Head>
      <p>
        <FormattedMessage defaultMessage="Hello, World!" />
      </p>
      <p>
        <FormattedNumber value={1000} />
      </p>
    </Layout>
  )
}
export default Home
