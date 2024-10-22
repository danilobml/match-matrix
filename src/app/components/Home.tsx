import { Typography, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { getParsedSessionUser } from '../utils/manageSessionUser';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const router = useRouter();

  const user = getParsedSessionUser();

  return (
    <div style={{ padding: '15px 30px' }}>
      <Title>Relationship Anarchy Smorgasbord (Charted!)</Title>

      <Paragraph style={{ fontSize: '18px', textAlign: 'justify' }}>
        The Smorgasbord represents relationships as a plate filled with various options from a buffet. It allows for customization in nearly every category, embracing relationship anarchist philosophy&apos;s flexibility. You can mark options as: 0 - No: Deal-breaker (something you really don&apos;t want in your connection), 1 - Not important, 2 - Somewhat important, 3 - Important, 4 - Very important, or 5 - Must-have (something essential for it to be a happy one for you).
      </Paragraph>

      <Paragraph style={{ fontSize: '18px', textAlign: 'justify' }}>
        It covers areas like Communication Frequency, Emotional Intimacy, Physical Intimacy, Romance, Domestic Routines, Kink, and Partnership. It also includes unique categories like Hierarchy/Power Differences, Collaboration, and Labels such as Chosen Family or Partner. The document stresses that transparency is key to avoiding conflicts and that expectations can evolve with mutual consent. It&apos;s a flexible, useful tool for starting discussions on what you want a relationship to be.
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
          style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}
        >
          Share Data!
        </Button>) : null}

      {user?.raSmorgasboardId ? (
        <Button
          type="primary"
          size="large"
          onClick={() => router.push('/charts')}
          style={{ marginTop: '20px' }}
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
