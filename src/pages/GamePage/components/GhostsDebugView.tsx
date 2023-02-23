import { Card } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { GhostDebugControls } from './GhostDebugControls';
import { GhostsDebugTable } from './GhostDebugTable';
import { VSpace } from '../../../components/Spacer';

export const GhostsDebugView: FC = observer(() => {

  const [scores, setScores] = useState<any>([])
  async function getList() {
    try {
      const response = await fetch('https://hsapi.azurewebsites.net/getlist', {
        method: 'GET',
        headers: {
          'accept': 'text/plain'
        }
      });
      const data = await response.json();
      setScores(data);
      return data;
    } catch (error) {
      // handle error
    }
  }

  useEffect(() => {
    console.log(scores)
  }, [scores])
  useEffect(() => {
    getList()
  }, [])
  return (
    <div className="GhostsDebugView">
      <Card title="Score" size="small" bordered={false}>
        {scores.sort().map((x:any) => <p>{x.hsname} - {x.Score}</p>)}
      </Card>
    </div>
  );
});
