import { Flex, If, Text } from "@webshop/components";
import colors from "@webshop/constants/colors";
import { BsTrash } from "react-icons/bs";


import styles from './Header.module.css';


type Props = {
  showClearButton?: boolean;
  onClickClear: VoidFunction;
};

const Header: React.FC<Props> = ({showClearButton, onClickClear}) => (
  <Flex className={styles.container}>
    <Text variant='h2'>Kosár tartalma</Text>
    <If condition={!!showClearButton}>
      <Flex onClick={onClickClear} cursor='pointer'>
        <Text variant='small' color={colors.error} uppercase>
          Kosár ürítése
        </Text>
        <BsTrash
          color={colors.error}
          style={{marginLeft: 10}}
        />
      </Flex>
    </If>
  </Flex>
);

export default Header;
