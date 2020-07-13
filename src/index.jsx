import ForgeUI, { render, Fragment, Text, Button, ButtonSet, useState, useProductContext } from "@forge/ui";
import api from "@forge/api";

const OPTIONS = [
  ['Show me a joke', 'Programming Joke'],
];

const Panel = () => {
  const [joke, getJoke] = useState(null);

  async function JokeBot() {
    const response = await api.fetch(`https://sv443.net/jokeapi/v2/joke/Programming?type=single&blacklistFlags=nsfw%2Cracist%2Creligious%2Cpolitical%2Csexist`);
    const json = (await response.json()).joke;

    getJoke({
      description: json
    });
  }

  return (
    <Fragment>
      <ButtonSet>
        {OPTIONS.map(([label, code]) =>
          <Button
            text={label}
            onClick={async () => { await JokeBot(); }}
          />
        )}
      </ButtonSet>
      {joke && (
        <Fragment>
          <Text content={joke.description} />
        </Fragment>
      )}
    </Fragment>
  );
};


export const run = render(<Panel />);
