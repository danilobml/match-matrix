import { Typography, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { getParsedSessionUser } from '../utils/manageSessionUser';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const router = useRouter();

  const user = getParsedSessionUser();

  return (
    <div style={{ padding: '15px 60px' }}>
      <Title>Relationship Anarchy Smorgasbord (Charted!)</Title>

      <Paragraph style={{ fontSize: '18px', textAlign: 'justify' }}>
        The Smorgasbord has as its concept the idea that every relationship you have with another person is like a plate that the two of you are filling from this buffet of many options. It has blanks to fill in your own options in almost every category, because relationship anarchist philosophy allows for uniqueness of circumstances and no graphic could include everything, and the text with instructions suggests indicating whether certain categories and activities are &quot;Yes, Maybe, Maybe in the future, No,&quot; or color-coding your answers about whether or how often you want to include them in a given relationship. I&apos;ve never used this exact graphic in my own relationships (the latest version was created after my romantic relationship started) but the subjects listed are definitely some of the things that get brought up in discussing with play partners what a partnership looks like to us and what activities are involved - though there&apos;s a lot of &quot;jumping off&quot; from the relevant categories. I&apos;d suggest this as a tool, much like a Yes/No/Maybe list, for folks who want a place to start with these conversations.
      </Paragraph>

      <Paragraph style={{ fontSize: '18px', textAlign: 'justify' }}>
        Some of the categories included in the RA Smorgasbord include Communication Frequency &amp; Method; Emotional Intimacy; Physical Intimacy; Public Displays of Affection; Romance; Domestic Routines; Power Exchange / Kink; and Partnership. Some sections that we don&apos;t think of in polyam circles very often but that get to the heart of this being an RA document intended for all relationships include Hierarchy/Power Differences (this category includes being Boss and Employee, or Mentor and Mentee); Collaboration; and the Labels section includes being Chosen Family and literal familial labels as well as colleagues and various possible romantic labels. The document notes &quot;remember you can&apos;t sneak anything into this without the other knowing or there will be conflict and disappointment later&quot; as well as that expectations and agreements can always be changed by mutual agreement. Like any tool it has limits and is mostly a good starting point for the discussions you really need to have about what you want a particular relationship to be. But it is a pretty good indicator of the flexibility of relationship anarchist philosophy to customized relationships, and a useful tool.
      </Paragraph>

      <Button
        type="primary"
        size="large"
        onClick={() => router.push('/form')}
        style={{ marginTop: '20px' }}
      >
        Go to Form!
      </Button>

      {user?.raSmorgasboardId ? (
        <Button
          type="primary"
          size="large"
          onClick={() => router.push('/share')}
          style={{ marginTop: '20px', marginLeft: '10px' }}
      >
        Share your Data!
      </Button>) : null}

      {user?.raSmorgasboardId ? (
        <Button
          type="primary"
          size="large"
          onClick={() => router.push('/charts')}
          style={{ marginTop: '20px', marginLeft: '10px' }}
      >
        {user.sharedRaSmorgasboardId ? "Check out your shared charts!" : "Check out your charts!"}
      </Button>) : null}

      <Title style={{ marginTop: 40 }}>More to come in V0.2.1:</Title>
      <Paragraph style={{ fontSize: '22px' }}>. More Charts;</Paragraph>
      <Paragraph style={{ fontSize: '22px' }}>. Attachment Styles Map;</Paragraph>
      <Paragraph style={{ fontSize: '22px' }}>. Love Languages Map;</Paragraph>
      <Paragraph style={{ fontSize: '22px' }}>. Kinky Map;</Paragraph>
      <Paragraph style={{ fontSize: '22px' }}>. Notifications;</Paragraph>
      <Paragraph style={{ fontSize: '22px' }}>. We&apos;re open to more ideas...</Paragraph>
    </div>
  );
};

export default Home;
