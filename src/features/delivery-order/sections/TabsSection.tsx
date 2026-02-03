import { useState } from 'react';
import { Tabs } from '../../../components/ui';

export function TabsSection() {
  const [activeTab, setActiveTab] = useState('allocated-do');

  const tabs = [
    { id: 'do-information', label: 'DO Information', disabled: true },
    { id: 'allocated-do', label: 'Allocated DO' },
    { id: 'picking-list', label: 'Picking List', disabled: true },
  ];

  return <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />;
}
