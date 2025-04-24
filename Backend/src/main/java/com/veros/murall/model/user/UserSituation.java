package com.veros.murall.model.user;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;



public enum UserSituation {
    ATIVO("A", "Ativo"),
    INATIVO("I","Inativo"),
    PENDENTE("P", "Pendente");

    private String codigo;
    private String descricao;

    private UserSituation(String codigo, String descricao){
        this.codigo = codigo;
        this.descricao = descricao;
    }

    @JsonValue
    public String getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    @JsonCreator
    public static UserSituation doValor(String codigo){
        if(codigo.equals("A")){
            return ATIVO;
        }
        else if(codigo.equals("I")){
            return INATIVO;
        }
        else if(codigo.equals("P")){
            return PENDENTE;
        }
        else
        {
            return null;
        }
    }

}
