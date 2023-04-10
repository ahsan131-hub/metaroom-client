import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main
      meta={<Meta title="Meta Room" description="Organize your Class rooms" />}
    >
      <h1>Meta Room</h1>
    </Main>
  );
};

export default Index;
