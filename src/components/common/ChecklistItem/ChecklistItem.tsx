import { useState, useCallback } from "react";
import { P5, Spinner, Checkbox } from "@deskpro/deskpro-ui";
import { Card } from "../Card";
import type { FC } from "react";

type Props = {
  name: string,
  checked: boolean,
  onComplete?: () => Promise<void>,
};

const ChecklistItem: FC<Props> = ({ name, checked, onComplete }) => {
  const boxSize = 14;
  const [isLoading, setIsLoading] = useState(false);

  const onChange = useCallback(() => {
    setIsLoading(true);
    onComplete && onComplete().finally(() => setIsLoading(false));
  }, [onComplete]);

  return (
    <Card style={{ marginBottom: 7 }}>
      <Card.Media>
        {isLoading
          ? (
            <div style={{ width: `${boxSize}px`, height: `${boxSize}px` }}>
              <Spinner size="extra-small"/>
            </div>
          )
          : (
            <Checkbox size={boxSize} checked={checked} onChange={onChange} />
          )
        }
      </Card.Media>
      <Card.Body size={boxSize}><P5>{name}</P5></Card.Body>
    </Card>
  );
};

export { ChecklistItem };
