export const SiteMetaData = {
  title: 'lovpune music',
  description: 'Official website for music artist lovpune',
  author: 'Mia Madden',
  url: 'https://www.lovpune.com',
  image:
    'https://firebasestorage.googleapis.com/v0/b/mia-madden-music.appspot.com/o/preview.png?alt=media',
};

export const HomePageData = {
  // title: 'Mia Madden',
  title: 'lovpune',
};

export function MetaTags() {
  return (
    <>
      <meta name="description" content={SiteMetaData.description} />
      <meta
        name="keywords"
        content="music mia madden funk psych jazz pop girl 
            band newindie indie indiepop 
            pop underground undergroundmusic
            new newmusic miamadden imminent 
            euphoria imminenteuphoria sanantonio
            san antonio artist bandcamp soundcloud
            cute cutemusic latejuly freshmusic
            indieplaylist indie2020 pop2020 2020 lovpune"
      />
      <meta name="author" content={SiteMetaData.author} />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SiteMetaData.url} />
      <meta property="og:title" content={SiteMetaData.title} />
      <meta property="og:description" content={SiteMetaData.description} />
      <meta property="og:image" content={SiteMetaData.image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={SiteMetaData.url} />
      <meta property="twitter:title" content={SiteMetaData.title} />
      <meta property="twitter:description" content={SiteMetaData.description} />
      <meta property="twitter:image" content={SiteMetaData.image} />
    </>
  );
}
