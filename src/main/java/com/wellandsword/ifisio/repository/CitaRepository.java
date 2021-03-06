package com.wellandsword.ifisio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellandsword.ifisio.domain.Cita;

/**
 * Spring Data repository for the Cita entity.
 */
@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

	List<Cita> findByTratamientoClienteClienteId(Long id);
}
