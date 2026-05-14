import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export default function TransactionBreakdownLayout(props: LayoutProps<'/transaction/breakdown'>) {
  return (
    <Section name='Transaction Breakdown' variant='h4' breadcrumbs={BREADCRUMBS['transaction-breakdown']}>
      {props.children}

      {props.summary}

      {props.daily}
      {props.monthly}

      {props.top}
    </Section>
  );
}
