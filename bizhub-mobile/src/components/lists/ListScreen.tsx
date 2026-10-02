import React from 'react';
import {
  FlatList,
  FlatListProps,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '@/theme';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import { ListFooter } from './ListFooter';
import { ListEmpty } from './ListEmpty';

export interface ListScreenProps<T>
  extends Omit<FlatListProps<T>, 'data' | 'renderItem'> {
  data: T[] | undefined;
  loading?: boolean;
  error?: unknown;
  onRetry?: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  renderItem: (item: T, index: number) => React.ReactElement;
  emptyIcon?: FlatListProps<T>['ListEmptyComponent'] extends never
    ? never
    : never;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  loadingMore?: boolean;
  hasMore?: boolean;
  keyExtractor: (item: T, index: number) => string;
  contentPadding?: number;
}

export function ListScreen<T>({
  data,
  loading,
  error,
  onRetry,
  refreshing,
  onRefresh,
  renderItem,
  emptyTitle = 'Nothing here yet',
  emptyDescription,
  emptyActionLabel,
  onEmptyAction,
  loadingMore,
  hasMore,
  keyExtractor,
  contentPadding = 16,
  ...rest
}: ListScreenProps<T>): React.ReactElement {
  const theme = useTheme();

  if (loading && !data) {
    return (
      <View style={styles.center}>
        <Spinner />
      </View>
    );
  }

  if (error && !data) {
    return (
      <ErrorState
        message="Could not load"
        onRetry={onRetry}
      />
    );
  }

  return (
    <FlatList
      {...rest}
      data={data ?? []}
      keyExtractor={keyExtractor}
      renderItem={({ item, index }) => renderItem(item, index)}
      contentContainerStyle={[
        {
          paddingHorizontal: contentPadding,
          paddingBottom: 32,
        },
        data && data.length === 0 && { flex: 1 },
        rest.contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={!!refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        ) : undefined
      }
      ListEmptyComponent={
        <ListEmpty
          title={emptyTitle}
          description={emptyDescription}
          actionLabel={emptyActionLabel}
          onAction={onEmptyAction}
        />
      }
      ListFooterComponent={
        <ListFooter loading={loadingMore} hasMore={!!hasMore} />
      }
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});