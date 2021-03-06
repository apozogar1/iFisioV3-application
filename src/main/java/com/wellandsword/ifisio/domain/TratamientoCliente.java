package com.wellandsword.ifisio.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A TratamientoCliente.
 */
@Entity
@Table(name = "tratamiento_cliente")
public class TratamientoCliente implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
	@SequenceGenerator(name = "sequenceGenerator")
	private Long id;

	@Column(name = "num_sesiones")
	private Long numSesiones;

	@Column(name = "diagnostico")
	private String diagnostico;

	@Column(name = "precio_sesion")
	private Float precioSesion;

	@Column(name = "expediente")
	private String expediente;

	@OneToMany(mappedBy = "tratamientoCliente")
	private Set<Cita> citas = new HashSet<>();

	@ManyToOne
	@JsonIgnoreProperties("tratamientoClientes")
	private Tratamiento tratamiento;

	@ManyToOne
	@JsonIgnoreProperties("tratamientoClientes")
	private Cliente cliente;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getNumSesiones() {
		return numSesiones;
	}

	public TratamientoCliente numSesiones(Long numSesiones) {
		this.numSesiones = numSesiones;
		return this;
	}

	public void setNumSesiones(Long numSesiones) {
		this.numSesiones = numSesiones;
	}

	public String getDiagnostico() {
		return diagnostico;
	}

	public TratamientoCliente diagnostico(String diagnostico) {
		this.diagnostico = diagnostico;
		return this;
	}

	public void setDiagnostico(String diagnostico) {
		this.diagnostico = diagnostico;
	}

	public Float getPrecioSesion() {
		return precioSesion;
	}

	public TratamientoCliente precioSesion(Float precioSesion) {
		this.precioSesion = precioSesion;
		return this;
	}

	public void setPrecioSesion(Float precioSesion) {
		this.precioSesion = precioSesion;
	}

	public String getExpediente() {
		return expediente;
	}

	public TratamientoCliente expediente(String expediente) {
		this.expediente = expediente;
		return this;
	}

	public void setExpediente(String expediente) {
		this.expediente = expediente;
	}

	public Set<Cita> getCitas() {
		return citas;
	}

	public TratamientoCliente citas(Set<Cita> citas) {
		this.citas = citas;
		return this;
	}

	public TratamientoCliente addCita(Cita cita) {
		this.citas.add(cita);
		cita.setTratamientoCliente(this);
		return this;
	}

	public TratamientoCliente removeCita(Cita cita) {
		this.citas.remove(cita);
		cita.setTratamientoCliente(null);
		return this;
	}

	public void setCitas(Set<Cita> citas) {
		this.citas = citas;
	}

	public Tratamiento getTratamiento() {
		return tratamiento;
	}

	public TratamientoCliente tratamiento(Tratamiento tratamiento) {
		this.tratamiento = tratamiento;
		return this;
	}

	public void setTratamiento(Tratamiento tratamiento) {
		this.tratamiento = tratamiento;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public TratamientoCliente cliente(Cliente cliente) {
		this.cliente = cliente;
		return this;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof TratamientoCliente)) {
			return false;
		}
		return id != null && id.equals(((TratamientoCliente) o).id);
	}

	@Override
	public int hashCode() {
		return 31;
	}

	@Override
	public String toString() {
		return "TratamientoCliente{" + "id=" + getId() + ", numSesiones=" + getNumSesiones() + ", diagnostico='"
				+ getDiagnostico() + "'" + ", precioSesion=" + getPrecioSesion() + ", expediente='" + getExpediente()
				+ "'" + "}";
	}
}
