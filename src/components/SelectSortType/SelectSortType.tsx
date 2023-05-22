import * as React from 'react';
import Select, { SelectStaticProps } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import { addSortByParameter } from '../store/subscriptionsListSlice';
export const SelectSortType = () => {
  const { sortByParameter } = useAppSelector((state) => state.subscriptionsList);
  const dispatch = useAppDispatch();
  const action: SelectStaticProps['action'] = React.useRef(null);
  return (
    <Select
      color='neutral'
      variant='plain'
      action={action}
      value={sortByParameter}
      size='md'
      placeholder='Sort by...'
      onChange={(e, newValue) => {
        dispatch(addSortByParameter({ sortByParameter: newValue }));
      }}
      {...(sortByParameter && {
        endDecorator: (
          <IconButton
            size='sm'
            variant='plain'
            color='neutral'
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
            onClick={() => {
              dispatch(addSortByParameter({ sortByParameter: null }));
              action.current?.focusVisible();
            }}
          >
            <CloseRounded />
          </IconButton>
        ),
        indicator: null,
      })}
      sx={{ minWidth: 160 }}
    >
      <Option value='dateToOld'>Newest to Oldest</Option>
      <Option value='dateToNew'>Oldest to Newest</Option>
      <Option value='priceToHigh'>Price Low to High</Option>
      <Option value='priceToLow'>Price High to Low</Option>
      <Option value='alphabetToZ'>Alphabet to Z</Option>
      <Option value='alphabetToA'>Alphabet to A</Option>
    </Select>
  );
};