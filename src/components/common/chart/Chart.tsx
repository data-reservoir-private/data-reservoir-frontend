import { useRef, useEffect } from 'react'
import { init, getInstanceByDom, EChartsOption } from 'echarts'
import Box from '@mui/material/Box'
import classNames from 'classnames'

interface EChartProps {
  option: EChartsOption,
  className?: string
}

export const EChart = (props: EChartProps) => {
  const chartRef = useRef(null)

  useEffect(() => {
    // Initialize chart
    const chart = init(chartRef.current, null)

    return () => {
      chart?.dispose()
    }
  }, []);

  useEffect(() => {
    // Re-render chart when option changes
    const chart = getInstanceByDom(chartRef.current!)!;

    window.addEventListener('resize', function () {
      chart.resize();
    })

    chart.setOption(props.option);
  }, [props.option]);


  return <Box className={classNames(props.className)} ref={chartRef} {...props} />
}