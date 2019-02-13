import { Options, MapStateToPropsParam, connect as originalConnect, MergeProps, MapDispatchToPropsParam } from "react-redux";

export function connect<State = {}, TOwnProps = {}, TStateProps = {},  TDispatchProps = {}, TMergedProps = {}>(
  mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
  mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
  mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
  options?: Options<State, TStateProps, TOwnProps>)
{
  return function(target: any)
  {
    return originalConnect(mapStateToProps, mapDispatchToProps as any, mergeProps as any, options as any)(target) as any;
  }
}