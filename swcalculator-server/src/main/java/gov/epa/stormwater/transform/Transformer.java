package gov.epa.stormwater.transform;

public interface Transformer {
	public <IOBJ, OOBJ> OOBJ transformObject(IOBJ inputObj,
			Class<OOBJ> outputObjCls);
}
