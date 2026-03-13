import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export default function TransactionMonthlyLayout(props: LayoutProps<'/transaction/monthly'>) {
  return (
    <Section name='Transaction Monthly' variant='h4' breadcrumbs={BREADCRUMBS['transaction-monthly']}>
      {props.children}

      {props.summary}

      {props.daily}

      {props.top}
    </Section>
  );
}
